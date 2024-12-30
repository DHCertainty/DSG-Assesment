/* eslint-disable */
import dayjs from "dayjs";
import Decimal from "decimal.js";
import axios from 'axios';
import store from '../store/index.js'

export const invoice_table = "crb5c_fowinvoices";
export const customer_table = "crb5c_fow_customers"

const invoice_params ={
    $select:'crb5c_id,crb5c_amt,crb5c_date,crb5c_qty,crb5c_subsidy,crb5c_total,crb5c_subtotal,crb5c_gst,crb5c_gst_amt,crb5c_fee_type,crb5c_description, crb5c_advfees',
    $expand:`crb5c_client($select=crb5c_name,crb5c_address,crb5c_address2,crb5c_no,crb5c_nricno,crb5c_postcode),crb5c_fow_adjustments_invoice($select=crb5c_amt,crb5c_date,crb5c_is_refund,crb5c_ref),crb5c_cn_invoice($select=crb5c_amount,crb5c_approval_date,crb5c_reference_no,crb5c_reason),crb5c_payment_invoice($select=crb5c_amount;$expand=crb5c_payment($select=crb5c_receipt_date,crb5c_reference)), crb5c_associated_sessions($select=crb5c_checkin_time),crb5c_ExportID($select=crb5c_fowexportname)`
}
const customer_params ={
    $select:`crb5c_name,crb5c_address,crb5c_address2,crb5c_postcode,crb5c_city,crb5c_countryregioncode,crb5c_fow_customerid,crb5c_no,crb5c_partialnric,crb5c_nricno,crb5c_admissiondate,crb5c_client_status,crb5c_amountcollected,crb5c_contact,crb5c_phoneno,crb5c_paymenttermscode,crb5c_email,crb5c_transport_fee${process.env.VITE_ENABLE_CIP?',crb5c_cipmember':''}`,
    $expand:`crb5c_invoice_client($select=crb5c_amt,crb5c_subsidy,crb5c_qty,crb5c_gst,crb5c_date;$expand=crb5c_cn_invoice($select=crb5c_amount)),crb5c_payment_client($select=crb5c_amount,crb5c_receipt_date,crb5c_is_deposit),crb5c_ExportID($select=crb5c_fowexportname),crb5c_crb5c_clientcaregiverbridgetable_Client_c($select=crb5c_clientcaregiverbridgetableid;$expand=crb5c_Caregiver($select=crb5c_caregiverrank,crb5c_name,crb5c_contactnumbermobile,crb5c_email,crb5c_contactnumberhome,crb5c_isthispersonemergencycontact,crb5c_caregiverrank)),crb5c_fow_adjustments_client($select=crb5c_amt),crb5c_subsidy($select=crb5c_amt,crb5c_subsidy,crb5c_type)`
}
export const getCustomer = async ($,clientId)=>{
    let customer_options = new URLSearchParams(customer_params);
    customer_options.append("$filter",`crb5c_fow_customerid eq '${clientId}'`)
    let {data:{value:customers}} = await $.get(`${customer_table}?${customer_options.toString()}`);
    return transformDataCustomer(customers[0]);
}

export const transformDataCustomer =(raw)=>{
    
    //fake customer balance algo
    //let chxsum = parseInt(raw.crb5c_partialnric+raw.crb5c_no.toLowerCase().replace(/[^a-z0-9]/gi, ''),36).toString().match(/\d/)?.[0]||0;
    //let seed = Number(`0.${chxsum}`);
    //let rawGen = Math.round(seed*7 - 5)*100;
    //let customerBalanceGen = rawGen < -300 ? 0 : rawGen
    
    //realdata
    let deposit = new Decimal(0);
    let balance = new Decimal(0);
    let lastpayment = undefined;

    for(let invoice of raw.crb5c_invoice_client){
        //skip draft and future invoices
        if(!invoice.crb5c_date || dayjs(invoice.crb5c_date).startOf("day").isAfter(dayjs())){
            continue;
        }

        balance = balance.sub(
            Decimal.sub(
                Decimal.div(invoice.crb5c_amt||0,100),
                Decimal.div(invoice.crb5c_subsidy||0, 100)
            ).mul(invoice.crb5c_qty).mul(Decimal.div(invoice.crb5c_gst,100).add(1)).toDP(2)
        );

        for(let cn of invoice.crb5c_cn_invoice){
            balance = balance.add(Decimal.div(cn.crb5c_amount,100));
        }
    }
    for(let payment of raw.crb5c_payment_client){
        if(payment.crb5c_is_deposit){
            deposit = deposit.add(Decimal.div(payment.crb5c_amount,100));
            continue;
        }
        balance = balance.add(Decimal.div(payment.crb5c_amount,100));

        if(!lastpayment || dayjs(lastpayment).isAfter(dayjs(payment.crb5c_receipt_date))){
            lastpayment = payment.crb5c_receipt_date;
        }
        
    }
    for(let adjustment of raw.crb5c_fow_adjustments_client){
        balance = balance.sub(Decimal.div(adjustment.crb5c_amt,100));
    }

    let caregiver = raw.crb5c_crb5c_clientcaregiverbridgetable_Client_c.map((cg)=>{
        let rank = cg.crb5c_Caregiver?.crb5c_caregiverrank;
        let priority =rank===null||rank ===undefined ? undefined : rank;
        return {
            name:cg.crb5c_Caregiver?.crb5c_name||"",
            phone:cg.crb5c_Caregiver?.crb5c_contactnumbermobile||cg.crb5c_Caregiver?.crb5c_contactnumberhome||"",
            email:cg.crb5c_Caregiver?.crb5c_email,
            priority,
            isPrimary:priority===0

        }
    })

    let intakeDate=raw.crb5c_admissiondate?dayjs(raw.crb5c_admissiondate).format("YYYY-MM-DD"):"";
    let programmeFee = raw.crb5c_subsidy?.crb5c_amt? Decimal.div(raw.crb5c_subsidy?.crb5c_amt,100).toNumber():undefined;
    let programmeSubsidy = raw.crb5c_subsidy?.crb5c_amt? Decimal.div(raw.crb5c_subsidy?.crb5c_subsidy,100).toNumber():undefined;
    let programmeType = raw.crb5c_subsidy?.['crb5c_type@OData.Community.Display.V1.FormattedValue'];
    let programmeTransport =raw.crb5c_transport_fee?Decimal.div(raw.crb5c_transport_fee,100).toNumber():undefined;


    return {
        guid:raw.crb5c_fow_customerid,
        name: raw.crb5c_no,
        id:raw.crb5c_partialnric,
        full_id:raw.crb5c_nricno,   
        address1:raw.crb5c_address,
        address2:raw.crb5c_address2,
        postal:raw.crb5c_postcode,
        city:raw.crb5c_city,
        country: raw.crb5c_countryregioncode,
        status:raw["crb5c_client_status@OData.Community.Display.V1.FormattedValue"],
        type:raw.crb5c_cipmember ? "CIP" : "Regular",
        intakeDate,
        depositPaid:deposit.toNumber(),
        lastPaid:lastpayment ? dayjs(lastpayment).format("YYYY-MM-DD") : "",
        customerBalance: balance.toNumber(),
        bc:{
            contactName:raw.crb5c_contact,
            phoneNo:raw.crb5c_phoneno,
            email:raw.crb5c_email,
            paymentCode: raw.crb5c_paymenttermscode ||"30D"
        },
        caregiver,
        programmeFee,
        programmeSubsidy,
        programmeType,
        programmeTransport

    }
}

export const transformDataInvoice = (raw) =>{
    if(!raw){
        return undefined;
    }
    let list_cn = raw.crb5c_cn_invoice.map((a)=>{return{date:a.crb5c_approval_date,amt:a.crb5c_amount/100,type:"cn",ref:a.crb5c_reference_no,remarks:a.crb5c_reason,guid:a.crb5c_fow_credit_noteid}});
    let list_payment = raw.crb5c_payment_invoice.map((a)=>{return{date:a?.crb5c_payment?.crb5c_receipt_date,amt:a.crb5c_amount/100,type:"payment",ref:a.crb5c_payment?.crb5c_reference}});
    let list_adjustment = raw.crb5c_fow_adjustments_invoice.map((a)=>{return{date:a.crb5c_date,amt:a.crb5c_amt/100,type:a.crb5c_is_refund ? "refund" : "adjustment",ref:a.crb5c_ref}});
    let sessions =raw.crb5c_associated_sessions.map((a)=>dayjs(a.crb5c_checkin_time).format("YYYY-MM-DD (A)"));

    let gst = raw.crb5c_gst;
    return {
        id: raw.crb5c_id,
        guid:raw.crb5c_fowinvoiceid,
        link:`/invoices/${raw.crb5c_fowinvoiceid}`,
        description: raw.crb5c_description,
        client_id:raw.crb5c_client?.crb5c_fow_customerid,
        client_bc:raw.crb5c_client?.crb5c_name,
        client_name:raw.crb5c_client?.crb5c_no,
        client_nric:raw.crb5c_client?.crb5c_nricno,
        client_address_line1:raw.crb5c_client?.crb5c_address,
        client_address_line2:raw.crb5c_client?.crb5c_address2,    
        client_address_postal:raw.crb5c_client?.crb5c_postcode,    
        
        date: raw.crb5c_date,
        //month:dayjs(raw.crb5c_date).format('MMM [\']YY'),
        amount: raw.crb5c_amt/100,
        qty: raw.crb5c_qty,
        subsidy:raw.crb5c_subsidy/100,
        //subtotal:raw.crb5c_subtotal,
        gst,
        //gst_amt:raw.crb5c_gst_amt,
        fee_type: raw['crb5c_fee_type@OData.Community.Display.V1.FormattedValue'],
        //total,
        //paid,
        //creditnote,
        //due,
        sessions,
        list_cn,
        list_payment,
        list_adjustment,
        advfees: raw.crb5c_advfees? raw.crb5c_advfees/100: undefined
    }
}


export const generateInvoiceNumber =async(invoiceDate, prefix="FOW" )=>{
    let start = `${prefix}-INV-${invoiceDate&&dayjs(invoiceDate).format("YYMM")}-`;
    
    let invoice_options = new URLSearchParams({
        $select:"crb5c_id",
        $filter:`startswith(crb5c_id,'${start}')`
    });
    
    let {data:{value:invoices}} = await store.state.axios.get(`${invoice_table}?${invoice_options.toString()}`);
    let suffixes = invoices.map((inv)=>inv.crb5c_id.substring(start.length)).filter((sfx)=>!!Number(sfx)).sort();
    let lastSuffix = Number(suffixes[suffixes.length-1]||0);
    let id = `${start}${String(lastSuffix+1).padStart(3,'0')}`

    const exists = invoices.some((inv) => inv.crb5c_id === id);
        if (exists) {
            return generateInvoiceNumber();
        } else {
            return id;
        }
}

export const getInvoices = async ($,clientId)=>{
    let invoice_options = new URLSearchParams(invoice_params);
       if (typeof clientId !== 'undefined') {
            invoice_options.append("$filter",`_crb5c_client_value eq '${clientId}'`);
       }

       let {data:{value:invoices}} = await $.get(`${invoice_table}?${invoice_options.toString()}`);
       let output = invoices.map(transformDataInvoice).filter((a)=>!!a);
       if(!clientId){
            const uat = Boolean(localStorage.getItem("fow_bill_uat"))
            db.dbcache.put({key:uat ? "invoices_uat":"invoices",value:output,date:Date.now()})
       }
       return output

}

export const getInvoice = async ($, invoiceId)=>{
    let invoice_options = new URLSearchParams(invoice_params);

    let {data:invoice} = await $.get(`${invoice_table}(${invoiceId})?${invoice_options.toString()}`);
    return transformDataInvoice(invoice);
}


export const createInvoice = async (invData, type="FOW") => {
    const invWithGst = invData.filter(inv => inv.gst === true);
    const invoices = [];

    for (let inv of invWithGst) {
        const { cost, name, client_id } = inv;

        if (!inv.id) {
            inv.id = await generateInvoiceNumber(dayjs(), type);
        }

        let descriptionHTML = `<p>${name}</p>`;
        let onlyGstAmount = cost * 0.09;

        const payload = {
            crb5c_date: dayjs(),
            crb5c_amt: cost * 100,
            crb5c_id: inv.id,
            crb5c_gst: Math.round(9),
            crb5c_gst_amt: Math.round(onlyGstAmount * 100),
            crb5c_description: descriptionHTML,
            crb5c_subtotal: cost,
            crb5c_qty: 1,
            "crb5c_client@odata.bind": `/crb5c_fow_customers(${client_id})`,
        };

        try {
            const { data } = await store.state.axios.post(`/crb5c_fowinvoices`, payload);
            invoices.push(data);
        } catch (error) {
            console.error(`Failed to create invoice for ${name}:`, error);
        }
    }

    return invoices;
}

export const createDeposit = async (depositAmt,client,isPaid) => {
    const deposit = [];
    let amt = depositAmt;
    let ref = 'FOW-Deposit-' + client;

    const payload = {
        crb5c_depoamount: amt.toString(),
        crb5c_depopaid: isPaid,
        crb5c_depositref: ref,
        crb5c_InitialAssessment: true,
    };
    console.log(payload)
    try {
        const { data } = await store.state.axios.patch(`/crb5c_fow_customers(${client})`,payload);
        deposit.push(data);
    } catch (error) {
        console.error(`Failed to create deposit`, error);
    }

    return deposit;
}
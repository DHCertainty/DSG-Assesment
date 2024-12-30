import * as msal from "@azure/msal-node";
import axios from 'axios';

const { MS_APP_ID, MS_APP_SECRET, TENANT_ID } = process.env;

const clientConfig = {
    auth: {
        clientId: MS_APP_ID,
        clientSecret: MS_APP_SECRET,
        authority: `https://login.microsoftonline.com/${TENANT_ID}`
    }
};

const cca = new msal.ConfidentialClientApplication(clientConfig);

export default async (req, res) => {
    const { cr_email, cr_name, staff_name, staff_email } = req.body;
    try {
        const { accessToken } = await cca.acquireTokenByClientCredential({
            scopes: ['https://graph.microsoft.com/.default'],
            skipCache: true
        });

        const mailData = {
            message: {
                subject: " 🎉 Welcome to DSG FOW programme",
                body: {
                    contentType: "HTML",
                    content: `
                        <p>Dear ${cr_name},</p>
                        <p>Congratulations! We are thrilled to officially welcome your loved one to our Family of Wisdom program.</p>
                        <p>To make staying informed and connected easier, we’ve developed an app just for you. With our app, you’ll have access <span style="color: blue;">to your loved one's</span> :</p>
                        <ul>
                            <li>Session Reports: Stay updated on progress and achievements.</li>
                            <li>Invoices: Manage and review payments seamlessly.</li>
                            <li>And so much more!</li>
                        </ul>
                        <p>📲 <a href="https://fow-mobile.npo.sg/">Download the app now</a></p>
                        <p>(After clicking the link follow the simple instructions to install the mobile app on your device)</p>
                        <p>Thank you for trusting us to be a part of this important journey <span style="color: blue;">with your loved one</span>. If you have any questions or need assistance setting up the app, don’t hesitate to reach out.</p>
                        <p>We look forward to working together and making a positive impact to your <span style="color: blue;">loved one</span>!</p>
                        <p style="color: blue;">Best Regards</p>
                        <p style="color: blue;">From ${staff_name}</p>
                    `,
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: cr_email,
                        },
                    },
                ],
            },
            saveToSentItems: true,
        };

        const userPrincipalName = staff_email;

        const mailApiURL = `https://graph.microsoft.com/v1.0/users/${userPrincipalName}/sendMail`;
        const response = await axios.post(mailApiURL, mailData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });

        return res.status(200).json({ message: 'Email sent successfully', data: response.data });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

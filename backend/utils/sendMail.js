import nodemailer from 'nodemailer';


const sendOTPEmail = async (otp, userEmail) => {
  const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              padding: 20px;
              background-color: #f4f4f4;
              display: flex;
              justify-content: center;
          }
          .email-wrapper {
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              padding: 20px;
              margin: 20px;
          }
          .header {
              text-align: center;
              background-color: #ff8000;
              color: white;
              padding: 10px 0;
              border-radius: 8px 8px 0 0;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
          }
          .content {
              padding: 20px;
              text-align: center;
          }
          .content p {
              font-size: 18px;
              color: #333;
          }
          .otp-box {
              font-size: 24px;
              font-weight: bold;
              color: #ff8000;
              margin: 20px 0;
          }
          .button {
              background-color: #ff8000;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 5px;
              font-size: 18px;
              display: inline-block;
          }
          .footer {
              text-align: center;
              padding: 10px;
              font-size: 12px;
              color: #888;
              margin-top: 20px;
              border-top: 1px solid #eee;
          }
          .footer a {
              color: #ff8000;
              text-decoration: none;
          }
      </style>
  </head>
  <body>

  <div class="container">
      <div class="email-wrapper">
          <div class="header">
              <h1>Email Verification</h1>
          </div>
          <div class="content">
              <p>Hello,</p>
              <p>Thank you for registering! To complete your registration, please use the OTP below to verify your email address. This OTP is valid for 15 minutes:</p>
              <div class="otp-box">${otp}</div>
              <p>If you did not request this, please ignore this email.</p>
          </div>
          <div class="footer">
              <p>Need help? <a href="mailto:support@example.com">Contact Support</a></p>
              <p>© 2024 Your Company. All rights reserved.</p>
          </div>
      </div>
  </div>

  </body>
  </html>
  `;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: userEmail,
    from: `TripTales <${process.env.EMAIL_USER}>`,
    subject: "Your Account Verification OTP",
    html:htmlTemplate,
  };

  return transporter.sendMail(mailOptions);
};


const sendWelcomeMail = async (userEmail,userName) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Community</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                padding: 20px;
                display: flex;
                justify-content: center;
            }
            .email-wrapper {
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                padding: 20px;
                margin: 20px;
            }
            .header {
                text-align: center;
                background-color: #ff8000;
                color: white;
                padding: 20px 0;
                border-radius: 8px 8px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 26px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content p {
                font-size: 18px;
                color: #333;
                margin: 20px 0;
            }
            .button {
                background-color: #ff8000;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 18px;
                display: inline-block;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #888;
                margin-top: 20px;
                border-top: 1px solid #eee;
            }
            .footer a {
                color: #4CAF50;
                text-decoration: none;
            }
        </style>
    </head>
    <body>

    <div class="container">
        <div class="email-wrapper">
            <div class="header">
                <h1>Welcome to Our Community!</h1>
            </div>
            <div class="content">
                <p>Hello ${userName},</p>
                <p>We’re thrilled to have you here! Get ready to dive into your new account. We’re excited to help you get started on your journey with us.</p>
                <a href="https://yourwebsite.com/login" class="button">Get Started</a>
                <p>If you have any questions, feel free to reach out to us at any time. We're always happy to help!</p>
            </div>
            <div class="footer">
                <p>Need help? <a href="mailto:support@example.com">Contact Support</a></p>
                <p>© 2024 Your Company. All rights reserved.</p>
            </div>
        </div>
    </div>

    </body>
    </html>
    `;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: userEmail, 
    from: `TripTales <${process.env.EMAIL_USER}>`,
    subject: "Welcome to Prescripto!",
    html: htmlTemplate,
  };

  return transporter.sendMail(mailOptions);
};



export  {sendOTPEmail,sendWelcomeMail};

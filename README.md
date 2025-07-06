# 🕉️ Ganesh Utsav Contribution Management System

A complete web application for managing Ganesh Utsav contributions with user authentication, form submission, and WhatsApp notifications.

## Features

- 🔐 **Secure Authentication** - Only authorized users can access the system
- 📝 **Contribution Form** - Collect contributor details (Name, S/O or D/O, Address, Phone, Amount, Date)
- 📱 **WhatsApp Notifications** - Automatic notifications via Twilio when contributions are submitted
- 💾 **DynamoDB Storage** - All data stored securely in AWS DynamoDB
- 📊 **Real-time Dashboard** - View all contributions and total amounts
- 🎨 **Modern UI** - Beautiful, responsive design
- ☁️ **AWS Amplify** - Fully managed hosting and backend services

## Tech Stack

- **Frontend**: React.js with AWS Amplify UI
- **Backend**: AWS AppSync (GraphQL API)
- **Database**: Amazon DynamoDB
- **Authentication**: Amazon Cognito
- **Hosting**: AWS Amplify Hosting
- **Notifications**: Twilio WhatsApp API
- **Styling**: CSS3 with modern gradients and animations

## Quick Deployment Guide

### Prerequisites

1. **AWS Account** - Sign up at [aws.amazon.com](https://aws.amazon.com)
2. **GitHub Account** - For code repository
3. **Twilio Account** - For WhatsApp notifications (optional)

### Step 1: Upload to GitHub

1. Create a new repository on GitHub
2. Upload all the files from this project to your repository
3. Make sure the repository is public (for free Amplify hosting)

### Step 2: Deploy with AWS Amplify

1. **Go to AWS Amplify Console**
   - Log into AWS Console
   - Search for "Amplify"
   - Click "Get Started" or "New App" → "Host web app"

2. **Connect Repository**
   - Choose "GitHub" as your repository service
   - Authorize AWS to access your GitHub account
   - Select your repository
   - Choose the main branch

3. **Configure Build Settings**
   - Amplify will auto-detect React settings
   - Build settings should be:
     ```
     Build command: npm run build
     Output directory: build
     ```

4. **Deploy**
   - Click "Save and deploy"
   - Wait for the build to complete (5-10 minutes)

### Step 3: Set Up Backend Services

After the initial deployment, you need to set up the backend:

1. **Install Amplify CLI** (locally or use AWS CloudShell):
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Clone and Initialize**:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   amplify init
   ```

3. **Add Authentication**:
   ```bash
   amplify add auth
   # Choose: Default configuration
   # Choose: Username
   # Choose: No, I am done
   ```

4. **Add API**:
   ```bash
   amplify add api
   # Choose: GraphQL
   # Choose: Single object with fields
   # Enter schema (use the one in amplify/backend/api/ganeshutsavapi/schema.graphql)
   # Choose: Yes, generate code
   # Choose: JavaScript
   # Choose: Yes, generate all possible operations
   ```

5. **Add Lambda Function** (for WhatsApp notifications):
   ```bash
   amplify add function
   # Name: whatsappNotification
   # Runtime: Node.js
   # Template: Hello World
   ```

6. **Deploy Backend**:
   ```bash
   amplify push
   ```

### Step 4: Configure WhatsApp Notifications (Optional)

1. **Sign up for Twilio**:
   - Go to [twilio.com](https://twilio.com)
   - Create an account and get your credentials

2. **Set Environment Variables**:
   - In AWS Lambda console, find your `whatsappNotification` function
   - Add environment variables:
     - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
     - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
     - `TWILIO_FROM_NUMBER`: Your Twilio WhatsApp number

3. **Set up DynamoDB Streams**:
   - Go to DynamoDB console
   - Find your Contribution table
   - Enable streams
   - Create a trigger to invoke your Lambda function

### Step 5: Test Your Application

1. **Access your app** at the Amplify-provided URL
2. **Create an account** using the sign-up form
3. **Submit a test contribution**
4. **Check WhatsApp notification** (if configured)

## File Structure

```
ganesh-utsav-contributions/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js                 # Main application component
│   ├── App.css               # Application styles
│   ├── index.js              # Entry point
│   ├── index.css             # Global styles
│   ├── aws-exports.js        # AWS configuration (auto-generated)
│   ├── graphql/
│   │   ├── mutations.js      # GraphQL mutations (auto-generated)
│   │   └── queries.js        # GraphQL queries (auto-generated)
│   └── reportWebVitals.js
├── amplify/
│   └── backend/
│       ├── api/
│       │   └── ganeshutsavapi/
│       │       └── schema.graphql
│       ├── function/
│       │   └── whatsappNotification/
│       │       ├── src/index.js
│       │       └── package.json
│       └── backend-config.json
├── package.json
└── README.md
```

## Environment Variables

The following environment variables need to be set in your Lambda function:

- `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
- `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token  
- `TWILIO_FROM_NUMBER`: Your Twilio WhatsApp number

## Cost Estimation

**Monthly costs (estimated):**
- **AWS Amplify**: Free tier (1,000 build minutes, 15GB storage)
- **AWS AppSync**: Free tier (250,000 requests/month)
- **DynamoDB**: Free tier (25GB storage, 25WCU/25RCU)
- **Cognito**: Free tier (50,000 MAUs)
- **Lambda**: Free tier (1M requests/month)
- **Twilio**: ~$0.005 per WhatsApp message

**Total**: ~$5-10/month for typical usage

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in package.json
2. **Authentication not working**: Verify Cognito is properly configured
3. **API errors**: Check AppSync schema and permissions
4. **WhatsApp not sending**: Verify Twilio credentials and phone number format

### Support:

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Twilio WhatsApp Documentation](https://www.twilio.com/docs/whatsapp)
- [AWS Support](https://aws.amazon.com/support/)

## Security Features

- ✅ User authentication required
- ✅ Phone number uniqueness validation
- ✅ Input validation and sanitization
- ✅ Secure API endpoints
- ✅ HTTPS enforced
- ✅ AWS IAM roles and policies

## Contributing

This is a complete application ready for deployment. No additional development needed unless you want to customize features.

## License

This project is for educational and community use. Please ensure compliance with local regulations for data collection and messaging.

---

**Jai Ganesh! 🕉️**

*May Lord Ganesha bless your Ganesh Utsav celebrations!* 
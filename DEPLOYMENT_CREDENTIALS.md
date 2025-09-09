# 🔑 DEPLOYMENT CREDENTIALS & SETUP GUIDE

## 🚀 HOSTING PLATFORMS (Choose One)

### 1. RAILWAY (Recommended - Free Tier)
**Website:** https://railway.app
**Account Setup:**
- Email: tu-email@gmail.com
- Password: TuPassword123!
- GitHub connection required

**Free Tier Limits:**
- $5 credit monthly
- 500 hours execution
- 1GB RAM
- 1GB storage

**MongoDB Integration:**
- Automatic MongoDB addon
- Connection string: `${{MongoDB.DATABASE_URL}}`

---

### 2. VERCEL (Frontend + Serverless)
**Website:** https://vercel.com
**Account Setup:**
- Email: tu-email@gmail.com
- Password: TuPassword123!
- GitHub connection required

**Free Tier:**
- 100GB bandwidth
- Serverless functions
- Custom domains

---

### 3. HEROKU (Classic Option)
**Website:** https://heroku.com
**Account Setup:**
- Email: tu-email@gmail.com
- Password: TuPassword123!

**Free Tier:** No longer available (paid plans start at $7/month)

---

## 📧 EMAIL CONFIGURATION

### Gmail App Password Setup
**Account:** tu-email@gmail.com
**Steps:**
1. Go to: https://myaccount.google.com
2. Security > 2-Step Verification (enable)
3. Security > App passwords
4. Generate password for "Mail"
5. Use generated password (format: xxxx-xxxx-xxxx-xxxx)

**Environment Variables:**
```
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
EMAIL_FROM=noreply@monkeyfood.com
```

---

## 🗄️ DATABASE OPTIONS

### 1. MongoDB Atlas (Recommended)
**Website:** https://cloud.mongodb.com
**Account Setup:**
- Email: tu-email@gmail.com
- Password: TuPassword123!

**Free Tier:**
- 512MB storage
- Shared clusters
- Global availability

**Connection String:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/monkey_food_competition
```

### 2. Railway MongoDB (If using Railway)
**Automatic setup with Railway deployment**
**Connection:** `${{MongoDB.DATABASE_URL}}`

---

## 🌐 DOMAIN & DNS

### Free Domain Options:
1. **Freenom:** https://freenom.com (.tk, .ml, .ga domains)
2. **Railway subdomain:** automatic (yourapp.up.railway.app)
3. **Vercel subdomain:** automatic (yourapp.vercel.app)

### Custom Domain Setup:
**Recommended:** Namecheap, GoDaddy, or Cloudflare
**Price:** $10-15/year

---

## 🔐 SECURITY CREDENTIALS

### JWT Secret
**Generate strong secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
**Example:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

### Admin Password
**Default:** `Pecera@2025!`
**Recommended:** Change to strong password
**Format:** Minimum 8 characters, letters + numbers + symbols

---

## 📊 ANALYTICS (Optional)

### Google Analytics
**Website:** https://analytics.google.com
**Setup:**
1. Create account with tu-email@gmail.com
2. Add property for your domain
3. Get tracking ID (format: G-XXXXXXXXXX)
4. Add to environment variables

---

## 🚀 QUICK DEPLOYMENT CHECKLIST

### Pre-deployment:
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Setup hosting account (Railway/Vercel)
- [ ] Configure email (Gmail app password)
- [ ] Setup database (MongoDB Atlas)

### Environment Variables:
```
PORT=3000
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-generated-secret
ADMIN_PASSWORD=your-admin-password
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=noreply@monkeyfood.com
```

### Post-deployment:
- [ ] Test registration form
- [ ] Test admin panel
- [ ] Test email notifications
- [ ] Verify prize distribution
- [ ] Setup custom domain (optional)

---

## 🆘 EMERGENCY CONTACTS

**Technical Support:**
- Railway: https://railway.app/help
- Vercel: https://vercel.com/support
- MongoDB: https://support.mongodb.com
- Gmail: https://support.google.com

**Backup Options:**
- Alternative hosting: Netlify, DigitalOcean
- Alternative email: SendGrid, Mailgun
- Alternative database: PostgreSQL, MySQL

---

## 💡 COST BREAKDOWN

**Free Option (Railway + MongoDB Atlas):**
- Hosting: $0 (with $5 monthly credit)
- Database: $0 (512MB free tier)
- Email: $0 (Gmail)
- **Total: $0/month**

**Professional Option:**
- Hosting: $5-10/month
- Database: $9/month (MongoDB Atlas)
- Domain: $10-15/year
- **Total: ~$15-20/month**

---

**🔒 SECURITY NOTE:** Never share these credentials publicly. Store them securely and change default passwords immediately after setup.

**📞 SUPPORT:** For technical issues, check the main deployment guide: `ONLINE_DEPLOYMENT_GUIDE.html`
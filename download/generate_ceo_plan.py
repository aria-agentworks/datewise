from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.lib.units import inch, cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# Font Registration
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
pdfmetrics.registerFont(TTFont('Calibri', '/usr/share/fonts/truetype/english/calibri-regular.ttf'))
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')
registerFontFamily('Calibri', normal='Calibri', bold='Calibri')

# Output path
OUTPUT_PATH = '/home/z/my-project/download/DateWise_CEO_Execution_Plan.pdf'

doc = SimpleDocTemplate(
    OUTPUT_PATH,
    pagesize=letter,
    title='DateWise CEO Execution Plan',
    author='Z.ai',
    creator='Z.ai',
    subject='Complete launch playbook for DateWise AI Dating Coach',
    leftMargin=1.8*cm,
    rightMargin=1.8*cm,
    topMargin=2*cm,
    bottomMargin=2*cm,
)

# Styles
cover_title = ParagraphStyle(
    name='CoverTitle', fontName='Times New Roman', fontSize=38,
    leading=46, alignment=TA_CENTER, spaceAfter=12, textColor=colors.HexColor('#e11d48')
)
cover_subtitle = ParagraphStyle(
    name='CoverSubtitle', fontName='Times New Roman', fontSize=18,
    leading=24, alignment=TA_CENTER, spaceAfter=8, textColor=colors.HexColor('#333333')
)
cover_author = ParagraphStyle(
    name='CoverAuthor', fontName='Times New Roman', fontSize=13,
    leading=20, alignment=TA_CENTER, spaceAfter=6, textColor=colors.HexColor('#666666')
)
h1_style = ParagraphStyle(
    name='H1', fontName='Times New Roman', fontSize=20,
    leading=26, alignment=TA_LEFT, spaceBefore=18, spaceAfter=10,
    textColor=colors.HexColor('#e11d48')
)
h2_style = ParagraphStyle(
    name='H2', fontName='Times New Roman', fontSize=15,
    leading=20, alignment=TA_LEFT, spaceBefore=14, spaceAfter=8,
    textColor=colors.HexColor('#1e293b')
)
h3_style = ParagraphStyle(
    name='H3', fontName='Times New Roman', fontSize=12,
    leading=16, alignment=TA_LEFT, spaceBefore=10, spaceAfter=6,
    textColor=colors.HexColor('#475569')
)
body_style = ParagraphStyle(
    name='Body', fontName='Times New Roman', fontSize=10.5,
    leading=17, alignment=TA_JUSTIFY, spaceAfter=6
)
bullet_style = ParagraphStyle(
    name='Bullet', fontName='Times New Roman', fontSize=10.5,
    leading=17, alignment=TA_LEFT, leftIndent=20, spaceAfter=4,
    bulletIndent=8
)
code_style = ParagraphStyle(
    name='Code', fontName='Calibri', fontSize=9,
    leading=14, alignment=TA_LEFT, backColor=colors.HexColor('#f8fafc'),
    leftIndent=12, rightIndent=12, spaceBefore=4, spaceAfter=4,
    borderPadding=6
)
caption_style = ParagraphStyle(
    name='Caption', fontName='Times New Roman', fontSize=9,
    leading=13, alignment=TA_CENTER, textColor=colors.HexColor('#64748b'),
    spaceBefore=3, spaceAfter=6
)
header_cell = ParagraphStyle(
    name='HeaderCell', fontName='Times New Roman', fontSize=10,
    leading=14, alignment=TA_CENTER, textColor=colors.white
)
cell_style = ParagraphStyle(
    name='Cell', fontName='Times New Roman', fontSize=10,
    leading=14, alignment=TA_CENTER
)
cell_left = ParagraphStyle(
    name='CellLeft', fontName='Times New Roman', fontSize=10,
    leading=14, alignment=TA_LEFT
)
highlight_box = ParagraphStyle(
    name='HighlightBox', fontName='Times New Roman', fontSize=10.5,
    leading=17, alignment=TA_LEFT, backColor=colors.HexColor('#fff1f2'),
    borderPadding=10, leftIndent=6, rightIndent=6, spaceAfter=8
)

TABLE_HEADER_COLOR = colors.HexColor('#1F4E79')
TABLE_ROW_ODD = colors.HexColor('#F5F5F5')

story = []

# ====== COVER PAGE ======
story.append(Spacer(1, 100))
story.append(Paragraph('<b>DateWise</b>', cover_title))
story.append(Spacer(1, 8))
story.append(Paragraph('<b>CEO Execution Plan</b>', ParagraphStyle(
    name='CoverTitle2', fontName='Times New Roman', fontSize=28,
    leading=34, alignment=TA_CENTER, textColor=colors.HexColor('#1e293b')
)))
story.append(Spacer(1, 20))

# Decorative line
line_table = Table([['']],colWidths=[200])
line_table.setStyle(TableStyle([
    ('LINEABOVE', (0,0), (-1,0), 2, colors.HexColor('#e11d48')),
]))
story.append(line_table)

story.append(Spacer(1, 20))
story.append(Paragraph('From Code to Revenue: Complete Launch Playbook', cover_subtitle))
story.append(Spacer(1, 40))
story.append(Paragraph('Prepared by: DateWise Engineering', cover_author))
story.append(Paragraph('Date: April 2026', cover_author))
story.append(Paragraph('Classification: Confidential', cover_author))
story.append(Spacer(1, 60))
story.append(Paragraph('Version 1.0', ParagraphStyle(
    name='Version', fontName='Times New Roman', fontSize=11,
    leading=16, alignment=TA_CENTER, textColor=colors.HexColor('#94a3b8')
)))
story.append(PageBreak())

# ====== EXECUTIVE SUMMARY ======
story.append(Paragraph('<b>1. Executive Summary</b>', h1_style))
story.append(Spacer(1, 6))
story.append(Paragraph(
    'DateWise is an AI-powered dating preparation platform designed to help users walk into every date '
    'prepared, confident, and ready to make genuine connections. The product addresses a real and underserved '
    'market: singles who want to maximize their chances of romantic success through structured preparation '
    'rather than relying on chance alone. The platform leverages advanced AI to provide compatibility analysis, '
    'personalized date plans, conversation guides, and post-date coaching, all within a clean, mobile-first '
    'Progressive Web App experience.',
    body_style
))
story.append(Paragraph(
    'As of April 2026, the DateWise MVP is fully coded and passing production builds. All seven engineering '
    'phases have been completed: core feature development, Clerk authentication integration, multi-user database '
    'architecture, Razorpay payment gateway with multi-currency support, PWA capabilities, comprehensive SEO '
    'optimization, and deployment preparation. The application features six distinct views including a polished '
    'landing page with conversion-focused copywriting, a multi-step profile builder, an AI-driven date planning '
    'workflow, an interactive dashboard, detailed date views, and a post-date debrief system powered by AI.',
    body_style
))
story.append(Paragraph(
    'This document serves as the definitive CEO playbook, outlining every remaining step from current code state '
    'to live production deployment and revenue generation. It covers infrastructure decisions (Supabase migration, '
    'Vercel deployment), domain and branding setup, a detailed go-to-market strategy including paid advertising and '
    'organic distribution channels, financial projections and unit economics, competitive positioning, and a '
    'phased timeline with clear milestones. The goal is straightforward: ship DateWise, acquire first 1,000 users, '
    'validate the product-market fit, and establish a foundation for sustainable recurring revenue.',
    body_style
))

# ====== CURRENT STATUS ======
story.append(Spacer(1, 18))
story.append(Paragraph('<b>2. Current Product Status</b>', h1_style))
story.append(Spacer(1, 6))

story.append(Paragraph('<b>2.1 Technical Architecture</b>', h2_style))
story.append(Paragraph(
    'DateWise is built on a modern, production-ready tech stack optimized for rapid iteration and '
    'scalability. The frontend is a Next.js 16 single-page application using TypeScript, Tailwind CSS 4, '
    'and the shadcn/ui component library. State management is handled by Zustand, enabling seamless client-side '
    'view navigation between the landing page, profile builder, date planning workflow, dashboard, date detail, '
    'and debrief views. The application uses Framer Motion for polished animations and provides a fully responsive '
    'mobile-first design with bottom navigation on mobile devices.',
    body_style
))

# Tech Stack Table
tech_data = [
    [Paragraph('<b>Layer</b>', header_cell), Paragraph('<b>Technology</b>', header_cell), Paragraph('<b>Purpose</b>', header_cell)],
    [Paragraph('Framework', cell_left), Paragraph('Next.js 16 + TypeScript', cell_left), Paragraph('Full-stack React framework', cell_left)],
    [Paragraph('Styling', cell_left), Paragraph('Tailwind CSS 4 + shadcn/ui', cell_left), Paragraph('Utility-first CSS + UI components', cell_left)],
    [Paragraph('State', cell_left), Paragraph('Zustand', cell_left), Paragraph('Client-side state management', cell_left)],
    [Paragraph('Auth', cell_left), Paragraph('Clerk', cell_left), Paragraph('Google + email authentication', cell_left)],
    [Paragraph('Database', cell_left), Paragraph('Prisma + SQLite (Supabase-ready)', cell_left), Paragraph('ORM + data persistence', cell_left)],
    [Paragraph('Payments', cell_left), Paragraph('Razorpay (Live)', cell_left), Paragraph('Multi-currency payment processing', cell_left)],
    [Paragraph('AI Engine', cell_left), Paragraph('GPT-4o via z-ai-web-dev-sdk', cell_left), Paragraph('Compatibility, plans, conversations', cell_left)],
    [Paragraph('PWA', cell_left), Paragraph('manifest.json + Service Worker', cell_left), Paragraph('Installable mobile experience', cell_left)],
    [Paragraph('Hosting', cell_left), Paragraph('Vercel (planned)', cell_left), Paragraph('Serverless deployment', cell_left)],
]
tech_table = Table(tech_data, colWidths=[90, 175, 215])
tech_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
    ('BACKGROUND', (0,4), (-1,4), TABLE_ROW_ODD),
    ('BACKGROUND', (0,6), (-1,6), TABLE_ROW_ODD),
    ('BACKGROUND', (0,8), (-1,8), TABLE_ROW_ODD),
]))
story.append(Spacer(1, 18))
story.append(tech_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 1.</b> DateWise Technology Stack', caption_style))
story.append(Spacer(1, 18))

story.append(Paragraph('<b>2.2 Completed Features</b>', h2_style))
features = [
    '<b>Landing Page:</b> Conversion-optimized with animated gradient hero, stats bar, DateWise Promise section (two-outcome messaging), feature cards, three-step "How It Works", testimonials, multi-currency pricing (USD default with auto-detection for INR, GBP, EUR, AUD, CAD), and a strong CTA section.',
    '<b>Profile Builder:</b> Four-step multi-step form covering basic info (name, age, gender), personality (communication style, humor style, love language), interests and goals (tag selection, dating goals), and date preferences (budget, setting). Pre-populates existing profiles.',
    '<b>Date Planning Workflow:</b> Multi-phase flow where users enter their date details (name, bio, platform, occasion) and receive AI-generated compatibility analysis (score 1-100 with alignment areas, friction points, talking points), personalized date plan (venue, timing, outfit, budget), and conversation guides (icebreakers, deep starters, humor suggestions, steering cues).',
    '<b>Dashboard:</b> Stats cards showing total dates, completed, and planned. Date list with status badges (planned, completed, cancelled). Empty state with CTA. PWA install button when available. Subscription status badge.',
    '<b>Date Detail:</b> Full compatibility report, date plan, talking points summary, and debrief section with collapsible sections for easy scanning.',
    '<b>Post-Date Debrief:</b> Star rating system, text feedback forms (what went well, what was awkward, surprises), AI-powered analysis and recommendations, and follow-up message generation with copy button.',
]
for f in features:
    story.append(Paragraph(f, bullet_style, bulletText='\xe2\x80\xa2'))

story.append(Spacer(1, 12))
story.append(Paragraph('<b>2.3 Revenue Model</b>', h2_style))
story.append(Paragraph(
    'DateWise operates on a freemium subscription model with three tiers designed to maximize both user '
    'acquisition and revenue per user. The free tier serves as the top of the funnel, allowing users to '
    'experience the core value proposition with one complimentary date per month. This is deliberately generous '
    'enough to hook users on the AI preparation workflow while creating natural upgrade pressure for active daters.',
    body_style
))

pricing_data = [
    [Paragraph('<b>Tier</b>', header_cell), Paragraph('<b>Price</b>', header_cell), Paragraph('<b>Dates/Month</b>', header_cell), Paragraph('<b>Features</b>', header_cell)],
    [Paragraph('Free', cell_style), Paragraph('$0', cell_style), Paragraph('1', cell_style), Paragraph('Basic compatibility, simple date plan', cell_left)],
    [Paragraph('Pro', cell_style), Paragraph('$9.99', cell_style), Paragraph('Unlimited', cell_style), Paragraph('Full analysis, date plans, conversation guides, debrief AI', cell_left)],
    [Paragraph('VIP', cell_style), Paragraph('$19.99', cell_style), Paragraph('Unlimited', cell_style), Paragraph('Everything in Pro + advanced matching, weekly strategy, priority AI, coaching', cell_left)],
]
pricing_table = Table(pricing_data, colWidths=[65, 70, 90, 255])
pricing_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
]))
story.append(Spacer(1, 18))
story.append(pricing_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 2.</b> Subscription Pricing Tiers', caption_style))
story.append(Spacer(1, 18))

# ====== PHASE 1: DEPLOYMENT ======
story.append(Paragraph('<b>3. Phase 1: Production Deployment (Week 1-2)</b>', h1_style))
story.append(Spacer(1, 6))

story.append(Paragraph('<b>3.1 Supabase Database Setup</b>', h2_style))
story.append(Paragraph(
    'The current local SQLite database will not function in a Vercel serverless environment because serverless '
    'functions have ephemeral filesystems with no persistent storage between invocations. This means every API '
    'call would create a fresh, empty database. The solution is to migrate to Supabase, which provides a managed '
    'PostgreSQL database with generous free-tier limits (500MB storage, 50,000 monthly active users) that more '
    'than covers early-stage needs.',
    body_style
))

story.append(Paragraph('<b>Step-by-step Supabase Setup:</b>', h3_style))
supabase_steps = [
    '<b>1. Create Supabase Account:</b> Go to supabase.com and sign up with your email or GitHub. Select the free tier plan. Choose a project name like "datewise-prod" and set a strong database password. Select the region closest to your target audience (US East for global, Singapore for Asia-Pacific).',
    '<b>2. Get Connection Strings:</b> Once the project is created, go to Settings > Database. Copy both the "URI" connection string and the "Transaction Pooler" connection string (direct URL). You will need both. The URI goes to DATABASE_URL and the pooler goes to DIRECT_URL in your .env file.',
    '<b>3. Run Schema Migration:</b> Replace the current prisma/schema.prisma with the provided schema.supabase.prisma (already generated in your project). Update the provider from "sqlite" to "postgresql" and add the directUrl parameter. Then run: <b>npx prisma generate</b> followed by <b>npx prisma db push</b> to create all tables in Supabase.',
    '<b>4. Enable Row Level Security (Optional but Recommended):</b> In Supabase, go to the Authentication tab and enable RLS on your tables. This ensures that even if someone bypasses your API, they cannot access another user data directly from the database layer.',
    '<b>5. Update .env File:</b> Set DATABASE_URL to your Supabase transaction pooler URL and DIRECT_URL to your Supabase direct connection URL. Both should start with "postgresql://".',
]
for s in supabase_steps:
    story.append(Paragraph(s, bullet_style, bulletText='\xe2\x80\xa2'))

story.append(Spacer(1, 12))
story.append(Paragraph('<b>3.2 Vercel Deployment</b>', h2_style))
story.append(Paragraph(
    'Vercel is the natural choice for hosting a Next.js application. It provides zero-configuration deployments, '
    'automatic HTTPS, global CDN, serverless API routes, and preview deployments for every pull request. The free '
    'hobby tier supports 100GB bandwidth per month, which is sufficient for the first several thousand users. '
    'Upgrading to the Pro tier ($20/month) becomes necessary only when you exceed these limits or need team collaboration '
    'features.',
    body_style
))

story.append(Paragraph('<b>Deployment Checklist:</b>', h3_style))
vercel_steps = [
    '<b>1. Push to GitHub:</b> Create a GitHub repository (private recommended). Push your code with a .gitignore that excludes node_modules, .next, db/custom.db, and .env files. The .env.example file should be committed as a reference.',
    '<b>2. Connect to Vercel:</b> Go to vercel.com, sign in with GitHub, and import your DateWise repository. Vercel will auto-detect Next.js and configure the build settings (build command: next build, output directory: .next).',
    '<b>3. Set Environment Variables:</b> In Vercel project Settings > Environment Variables, add ALL of the following: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, DATABASE_URL, and DIRECT_URL.',
    '<b>4. Clerk Production Keys:</b> IMPORTANT: The current Clerk keys are TEST keys (pk_test / sk_test). Before going live, you must create production keys in your Clerk Dashboard. Go to Dashboard > API Keys and click "Copy Publishable Key" and "Copy Secret Key" under the "Production" section. Update Vercel env vars with these production keys.',
    '<b>5. Deploy:</b> Click "Deploy". Vercel will build and deploy. Once done, you get a URL like datewise-xxx.vercel.app. Test the full flow: sign-up, profile creation, date planning, payment, and debrief.',
]
for s in vercel_steps:
    story.append(Paragraph(s, bullet_style, bulletText='\xe2\x80\xa2'))

story.append(Spacer(1, 12))
story.append(Paragraph('<b>3.3 Domain and Branding</b>', h2_style))
story.append(Paragraph(
    'A custom domain is essential for trust, branding, and SEO. The name "DateWise" is strong and memorable. '
    'The ideal domain is datewise.app, which signals both the product name and its app-like nature. Alternative '
    'options include datewise.ai (premium positioning), datewise.co (startup vibe), or getdatewise.com (call-to-action). '
    'Domain registrars like Namecheap or Cloudflare offer competitive pricing, typically $10-15/year for a .app domain. '
    'Once purchased, connect it to Vercel through Vercel Dashboard > Settings > Domains > Add Domain. Update your DNS '
    'records as instructed (usually adding a CNAME record pointing to cname.vercel-dns.com). Enable Vercel automatic HTTPS.',
    body_style
))

# ====== PHASE 2: MARKETING ======
story.append(Spacer(1, 18))
story.append(Paragraph('<b>4. Phase 2: Go-to-Market Strategy (Week 2-4)</b>', h1_style))
story.append(Spacer(1, 6))

story.append(Paragraph('<b>4.1 Distribution Strategy Overview</b>', h2_style))
story.append(Paragraph(
    'With approximately 200 social media followers, organic reach alone will not drive meaningful user acquisition. '
    'The go-to-market strategy relies on three pillars: paid acquisition through high-intent keyword targeting, '
    'directory listings for discovery and backlinks, and micro-influencer partnerships for social proof and credibility. '
    'Each pillar serves a distinct purpose in the user journey: paid ads create awareness, directories capture '
    'consideration-stage users, and influencer endorsements drive trust and conversion.',
    body_style
))

story.append(Paragraph('<b>4.2 Paid Advertising: Google Search Ads</b>', h2_style))
story.append(Paragraph(
    'Google Search Ads are the most efficient channel for DateWise because they capture users with demonstrated '
    'intent. Someone searching "how to prepare for a date" or "dating conversation starters" is already in the '
    'mindset that DateWise addresses. The recommended starting budget is $5/day ($150/month) focused exclusively '
    'on high-intent, long-tail keywords where competition is lower and conversion rates are higher. Broad terms '
    'like "dating app" should be avoided due to intense competition from well-funded incumbents.',
    body_style
))

keywords_data = [
    [Paragraph('<b>Keyword</b>', header_cell), Paragraph('<b>Intent</b>', header_cell), Paragraph('<b>Est. CPC</b>', header_cell), Paragraph('<b>Priority</b>', header_cell)],
    [Paragraph('how to prepare for a first date', cell_left), Paragraph('High', cell_style), Paragraph('$0.50-1.00', cell_style), Paragraph('Tier 1', cell_style)],
    [Paragraph('dating conversation starters', cell_left), Paragraph('High', cell_style), Paragraph('$0.40-0.80', cell_style), Paragraph('Tier 1', cell_style)],
    [Paragraph('date ideas that work', cell_left), Paragraph('Medium', cell_style), Paragraph('$0.30-0.60', cell_style), Paragraph('Tier 1', cell_style)],
    [Paragraph('AI dating coach', cell_left), Paragraph('Very High', cell_style), Paragraph('$0.80-1.50', cell_style), Paragraph('Tier 2', cell_style)],
    [Paragraph('what to talk about on a date', cell_left), Paragraph('High', cell_style), Paragraph('$0.40-0.70', cell_style), Paragraph('Tier 2', cell_style)],
    [Paragraph('dating compatibility test', cell_left), Paragraph('Medium', cell_style), Paragraph('$0.50-1.00', cell_style), Paragraph('Tier 2', cell_style)],
    [Paragraph('best date planning app', cell_left), Paragraph('Medium', cell_style), Paragraph('$0.60-1.20', cell_style), Paragraph('Tier 3', cell_style)],
    [Paragraph('how to be confident on dates', cell_left), Paragraph('High', cell_style), Paragraph('$0.30-0.50', cell_style), Paragraph('Tier 3', cell_style)],
]
kw_table = Table(keywords_data, colWidths=[175, 75, 95, 70])
kw_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
    ('BACKGROUND', (0,4), (-1,4), TABLE_ROW_ODD),
    ('BACKGROUND', (0,6), (-1,6), TABLE_ROW_ODD),
    ('BACKGROUND', (0,8), (-1,8), TABLE_ROW_ODD),
]))
story.append(Spacer(1, 18))
story.append(kw_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 3.</b> Priority Google Ads Keyword Targets', caption_style))
story.append(Spacer(1, 18))

story.append(Paragraph(
    'The ad copy should lead with the core value proposition: "Walk in prepared. Walk out with a connection." '
    'Landing page experience should direct users to a dedicated landing URL that highlights the free tier, '
    'reducing friction to entry. Include sitelink extensions pointing to features, pricing, and a "Try Free" '
    'deep link. Start with exact match and phrase match only, avoiding broad match to prevent wasted spend on '
    'irrelevant queries.',
    body_style
))

story.append(Paragraph('<b>4.3 Directory Listings and Product Launches</b>', h2_style))
story.append(Paragraph(
    'Submitting DateWise to directories serves two purposes: discovery (users browsing these platforms find your '
    'product) and authority (backlinks improve your domain authority for organic SEO). The highest-impact '
    'directories for an AI-powered SaaS product like DateWise include Product Hunt (launch day), AI tool '
    'directories, SaaS review platforms, and dating/relationship resource sites. Each listing should include '
    'a compelling description, screenshots, the OG image, and direct links to the live app.',
    body_style
))

dir_data = [
    [Paragraph('<b>Directory</b>', header_cell), Paragraph('<b>Category</b>', header_cell), Paragraph('<b>Impact</b>', header_cell), Paragraph('<b>Effort</b>', header_cell)],
    [Paragraph('Product Hunt', cell_left), Paragraph('AI / Dating', cell_style), Paragraph('Very High', cell_style), Paragraph('Medium', cell_style)],
    [Paragraph('There\'s An AI For That', cell_left), Paragraph('AI Tools', cell_style), Paragraph('High', cell_style), Paragraph('Low', cell_style)],
    [Paragraph('FutureTools', cell_left), Paragraph('AI Tools', cell_style), Paragraph('High', cell_style), Paragraph('Low', cell_style)],
    [Paragraph('AlternativeTo', cell_left), Paragraph('Lifestyle', cell_style), Paragraph('Medium', cell_style), Paragraph('Low', cell_style)],
    [Paragraph('G2 / Capterra', cell_left), Paragraph('SaaS', cell_style), Paragraph('High', cell_style), Paragraph('Medium', cell_style)],
    [Paragraph('Hacker News (Show HN)', cell_left), Paragraph('Tech', cell_style), Paragraph('Medium', cell_style), Paragraph('Low', cell_style)],
    [Paragraph('Reddit r/SaaS', cell_left), Paragraph('Community', cell_style), Paragraph('Medium', cell_style), Paragraph('Low', cell_style)],
]
dir_table = Table(dir_data, colWidths=[145, 90, 85, 85])
dir_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
    ('BACKGROUND', (0,4), (-1,4), TABLE_ROW_ODD),
    ('BACKGROUND', (0,6), (-1,6), TABLE_ROW_ODD),
]))
story.append(Spacer(1, 18))
story.append(dir_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 4.</b> Directory Submission Targets', caption_style))
story.append(Spacer(1, 18))

story.append(Paragraph('<b>4.4 Product Hunt Launch Strategy</b>', h2_style))
story.append(Paragraph(
    'A Product Hunt launch is the single highest-impact event for early-stage product awareness. A successful '
    'launch can drive 500-2,000 visitors in a single day and generate lasting backlinks and social proof. The '
    'key to a strong Product Hunt launch is preparation: the thumbnail image (use the existing OG image at '
    '240x240px), a punchy tagline ("AI dating coach that prepares you before every date"), a detailed '
    'description with screenshots, and a launch day support team of friends, colleagues, and online connections '
    'who will upvote and comment. Schedule the launch for a Tuesday, Wednesday, or Thursday between 12:01 AM '
    'and 9:00 AM Pacific Time for maximum visibility.',
    body_style
))
story.append(Paragraph(
    'Prepare the Product Hunt listing at least one week before launch. Write the first comment yourself '
    'explaining your motivation for building DateWise and the problem it solves. On launch day, engage with '
    'every comment within 30 minutes, share updates throughout the day (new feature, milestone user count), '
    'and post the launch link across all your social channels with a personal story. Even without a large '
    'following, a well-executed Product Hunt launch can put DateWise in front of 50,000+ tech-savvy early '
    'adopters who are the ideal target audience for AI-powered tools.',
    body_style
))

story.append(Paragraph('<b>4.5 Micro-Influencer Barter Partnerships</b>', h2_style))
story.append(Paragraph(
    'Micro-influencers (1,000-50,000 followers) in the dating, relationships, and self-improvement niches '
    'offer the best cost-per-impression ratio for early-stage products. The strategy is barter-based: offer '
    'free lifetime VIP access ($19.99/month value) in exchange for an honest review, social media post, or '
    'dedicated content piece about DateWise. This eliminates upfront cash outlay while providing authentic, '
    'trust-building endorsements from voices the target audience already follows.',
    body_style
))
story.append(Paragraph(
    'Target 50 micro-influencers across Instagram, TikTok, and YouTube. Expect a 20-30% response rate, '
    'meaning 10-15 partnerships from 50 outreach attempts. Each micro-influencer post can generate 50-500 '
    'visits depending on their engagement rate, providing a combined potential reach of 1,000-5,000 targeted '
    'visitors. Prioritize influencers whose content aligns with DateWise messaging: dating tips, relationship '
    'advice, confidence building, and self-improvement. Look for creators who have previously promoted apps '
    'or digital tools, as they understand the format.',
    body_style
))

# ====== PHASE 3: GROWTH ======
story.append(Spacer(1, 18))
story.append(Paragraph('<b>5. Phase 3: Growth and Optimization (Month 2-3)</b>', h1_style))
story.append(Spacer(1, 6))

story.append(Paragraph('<b>5.1 Analytics and Tracking</b>', h2_style))
story.append(Paragraph(
    'Data-driven decision-making is non-negotiable for a lean startup. Before spending significantly on '
    'marketing, implement comprehensive analytics to understand user behavior, identify drop-off points, '
    'and measure the effectiveness of each acquisition channel. The recommended analytics stack for DateWise '
    'consists of three tools: PostHog (free for up to 1 million events/month) for product analytics including '
    'feature usage funnels, Google Analytics 4 for web traffic and audience demographics, and Razorpay '
    'dashboard for payment analytics including conversion rates and revenue tracking.',
    body_style
))
story.append(Paragraph(
    'Key metrics to track include: sign-up conversion rate (landing page visitors who create an account), '
    'activation rate (users who complete their profile), feature adoption (users who create their first date), '
    'payment conversion (free users who upgrade to Pro or VIP), and retention (users who return after their '
    'first week). Set up dashboards that update daily and review them every Monday as part of the weekly '
    'operating rhythm. The single most important metric in the early days is activation rate, because users '
    'who experience the core value (completing a date preparation workflow) are dramatically more likely to '
    'convert to paid and become long-term users.',
    body_style
))

story.append(Paragraph('<b>5.2 Conversion Rate Optimization</b>', h2_style))
story.append(Paragraph(
    'The landing page is the primary conversion engine. Every percentage point improvement in sign-up rate '
    'directly impacts revenue. Start by setting up A/B testing with PostHog or a dedicated tool like VWO '
    '(free for small traffic). Test one variable at a time: headline copy, CTA button text and color, hero '
    'section layout, testimonial placement, and pricing presentation. Run each test for a minimum of 2 weeks '
    'or until statistical significance is reached (95% confidence level).',
    body_style
))
story.append(Paragraph(
    'Beyond the landing page, optimize the in-app conversion funnel. The profile builder is a critical '
    'checkpoint: users who complete their profile are 4-5x more likely to create dates and ultimately '
    'convert to paid. Consider simplifying the profile builder to 2-3 fields minimum for initial sign-up, '
    'then prompting for additional details contextually (e.g., asking about humor style right before '
    'generating talking points). Reduce friction everywhere: auto-fill fields where possible, save progress '
    'automatically, and show clear progress indicators.',
    body_style
))

story.append(Paragraph('<b>5.3 Referral and Viral Mechanics</b>', h2_style))
story.append(Paragraph(
    'Word-of-mouth is the highest-converting and lowest-cost acquisition channel. Implement a referral '
    'system where existing users get rewards (1 free additional date or 1 week of Pro) for every friend '
    'who signs up and completes their profile. Shareable outcomes are built into the product naturally: '
    'compatibility scores, date plans, and conversation guides are shareable by design. Add a "Share your '
    'DateWise experience" prompt after successful date debriefs with pre-written social media copy and '
    'a direct share button. Users who just had a great date are the most emotionally motivated to share.',
    body_style
))

# ====== FINANCIAL PROJECTIONS ======
story.append(Spacer(1, 18))
story.append(Paragraph('<b>6. Financial Projections</b>', h1_style))
story.append(Spacer(1, 6))

story.append(Paragraph('<b>6.1 Unit Economics</b>', h2_style))
story.append(Paragraph(
    'Understanding the unit economics of DateWise is critical for sustainable growth. The key metrics are '
    'Customer Acquisition Cost (CAC), Average Revenue Per User (ARPU), Lifetime Value (LTV), and the '
    'LTV:CAC ratio. For a healthy SaaS business, the target LTV:CAC ratio is 3:1 or higher, meaning '
    'each dollar spent acquiring a customer should generate at least three dollars in revenue over their '
    'lifetime. The projections below assume conservative estimates based on comparable AI-powered SaaS tools.',
    body_style
))

unit_data = [
    [Paragraph('<b>Metric</b>', header_cell), Paragraph('<b>Conservative</b>', header_cell), Paragraph('<b>Moderate</b>', header_cell), Paragraph('<b>Optimistic</b>', header_cell)],
    [Paragraph('Avg. CAC', cell_left), Paragraph('$3.50', cell_style), Paragraph('$2.00', cell_style), Paragraph('$1.00', cell_style)],
    [Paragraph('Free-to-Paid Conversion', cell_left), Paragraph('3%', cell_style), Paragraph('5%', cell_style), Paragraph('8%', cell_style)],
    [Paragraph('ARPU (Monthly)', cell_left), Paragraph('$0.50', cell_style), Paragraph('$0.90', cell_style), Paragraph('$1.60', cell_style)],
    [Paragraph('Avg. Lifetime (Months)', cell_left), Paragraph('4', cell_style), Paragraph('6', cell_style), Paragraph('9', cell_style)],
    [Paragraph('LTV', cell_left), Paragraph('$2.00', cell_style), Paragraph('$5.40', cell_style), Paragraph('$14.40', cell_style)],
    [Paragraph('LTV:CAC Ratio', cell_left), Paragraph('0.57:1', cell_style), Paragraph('2.70:1', cell_style), Paragraph('14.40:1', cell_style)],
]
unit_table = Table(unit_data, colWidths=[130, 100, 100, 100])
unit_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
    ('BACKGROUND', (0,4), (-1,4), TABLE_ROW_ODD),
    ('BACKGROUND', (0,6), (-1,6), TABLE_ROW_ODD),
]))
story.append(Spacer(1, 18))
story.append(unit_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 5.</b> Unit Economics Projections (Three Scenarios)', caption_style))
story.append(Spacer(1, 18))

story.append(Paragraph('<b>6.2 Monthly Revenue Projections (Moderate Scenario)</b>', h2_style))
story.append(Paragraph(
    'The following table projects monthly revenue under the moderate scenario, which assumes a $2 CAC, 5% '
    'free-to-paid conversion rate, and 6-month average user lifetime. These are deliberately conservative '
    'estimates based on industry benchmarks for AI SaaS tools in the lifestyle and dating vertical. Actual '
    'results may vary significantly based on the quality of the user experience, effectiveness of the marketing '
    'strategy, and the overall demand for AI dating preparation tools.',
    body_style
))

rev_data = [
    [Paragraph('<b>Month</b>', header_cell), Paragraph('<b>New Users</b>', header_cell), Paragraph('<b>Total Users</b>', header_cell), Paragraph('<b>Paid Users</b>', header_cell), Paragraph('<b>MRR</b>', header_cell)],
    [Paragraph('1', cell_style), Paragraph('100', cell_style), Paragraph('100', cell_style), Paragraph('5', cell_style), Paragraph('$50', cell_style)],
    [Paragraph('2', cell_style), Paragraph('200', cell_style), Paragraph('280', cell_style), Paragraph('14', cell_style), Paragraph('$140', cell_style)],
    [Paragraph('3', cell_style), Paragraph('350', cell_style), Paragraph('570', cell_style), Paragraph('29', cell_style), Paragraph('$290', cell_style)],
    [Paragraph('4', cell_style), Paragraph('500', cell_style), Paragraph('960', cell_style), Paragraph('48', cell_style), Paragraph('$480', cell_style)],
    [Paragraph('5', cell_style), Paragraph('700', cell_style), Paragraph('1,500', cell_style), Paragraph('75', cell_style), Paragraph('$750', cell_style)],
    [Paragraph('6', cell_style), Paragraph('1,000', cell_style), Paragraph('2,200', cell_style), Paragraph('110', cell_style), Paragraph('$1,100', cell_style)],
    [Paragraph('9', cell_style), Paragraph('2,000', cell_style), Paragraph('5,500', cell_style), Paragraph('275', cell_style), Paragraph('$2,750', cell_style)],
    [Paragraph('12', cell_style), Paragraph('3,500', cell_style), Paragraph('10,000', cell_style), Paragraph('500', cell_style), Paragraph('$5,000', cell_style)],
]
rev_table = Table(rev_data, colWidths=[65, 90, 90, 90, 80])
rev_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
    ('BACKGROUND', (0,4), (-1,4), TABLE_ROW_ODD),
    ('BACKGROUND', (0,6), (-1,6), TABLE_ROW_ODD),
    ('BACKGROUND', (0,8), (-1,8), TABLE_ROW_ODD),
]))
story.append(Spacer(1, 18))
story.append(rev_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 6.</b> Monthly Revenue Projections (Moderate Scenario)', caption_style))
story.append(Spacer(1, 18))

story.append(Paragraph('<b>6.3 Operating Costs</b>', h2_style))
story.append(Paragraph(
    'One of the key advantages of DateWise architecture is its low operating cost structure. The free-tier '
    'versions of the chosen infrastructure providers (Vercel, Supabase, Clerk) are generous enough to support '
    'the first several thousand users without any significant expenditure. The primary cost center is the AI '
    'API calls through GPT-4o, which consumes tokens for every compatibility analysis, date plan, conversation '
    'guide, and debrief. Each AI call costs approximately $0.01-0.05 depending on the complexity and token count.',
    body_style
))

cost_data = [
    [Paragraph('<b>Service</b>', header_cell), Paragraph('<b>Tier</b>', header_cell), Paragraph('<b>Monthly Cost</b>', header_cell), Paragraph('<b>When to Upgrade</b>', header_cell)],
    [Paragraph('Vercel', cell_left), Paragraph('Hobby (Free)', cell_style), Paragraph('$0', cell_style), Paragraph('After 100GB bandwidth', cell_left)],
    [Paragraph('Supabase', cell_left), Paragraph('Free', cell_style), Paragraph('$0', cell_style), Paragraph('After 500MB DB or 50K MAU', cell_left)],
    [Paragraph('Clerk', cell_left), Paragraph('Free', cell_style), Paragraph('$0', cell_style), Paragraph('After 10K MAU', cell_left)],
    [Paragraph('AI (GPT-4o)', cell_left), Paragraph('Pay-per-use', cell_style), Paragraph('$20-100', cell_style), Paragraph('Scale with usage', cell_left)],
    [Paragraph('Google Ads', cell_left), Paragraph('Manual', cell_style), Paragraph('$150', cell_style), Paragraph('Scale based on ROAS', cell_left)],
    [Paragraph('Domain', cell_left), Paragraph('Annual', cell_style), Paragraph('$1.25/mo', cell_style), Paragraph('N/A', cell_left)],
    [Paragraph('<b>Total (Early)</b>', cell_left), Paragraph('', cell_style), Paragraph('<b>$170-250</b>', cell_style), Paragraph('', cell_left)],
]
cost_table = Table(cost_data, colWidths=[100, 95, 90, 165])
cost_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
    ('BACKGROUND', (0,4), (-1,4), TABLE_ROW_ODD),
    ('BACKGROUND', (0,6), (-1,6), TABLE_ROW_ODD),
    ('BACKGROUND', (0,7), (-1,7), colors.HexColor('#ecfdf5')),
]))
story.append(Spacer(1, 18))
story.append(cost_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 7.</b> Monthly Operating Cost Breakdown', caption_style))
story.append(Spacer(1, 18))

# ====== TIMELINE ======
story.append(Paragraph('<b>7. Execution Timeline</b>', h1_style))
story.append(Spacer(1, 6))

timeline_data = [
    [Paragraph('<b>Week</b>', header_cell), Paragraph('<b>Phase</b>', header_cell), Paragraph('<b>Key Actions</b>', header_cell), Paragraph('<b>Deliverable</b>', header_cell)],
    [Paragraph('1', cell_style), Paragraph('Infrastructure', cell_left), Paragraph('Set up Supabase, migrate DB, deploy to Vercel, connect custom domain', cell_left), Paragraph('Live production app', cell_left)],
    [Paragraph('2', cell_style), Paragraph('QA + Auth', cell_left), Paragraph('Full flow testing, Clerk production keys, payment testing, bug fixes', cell_left), Paragraph('Stable production app', cell_left)],
    [Paragraph('3', cell_style), Paragraph('Directory Launch', cell_left), Paragraph('Submit to 10+ directories, prepare Product Hunt listing', cell_left), Paragraph('Directory presence', cell_left)],
    [Paragraph('4', cell_style), Paragraph('Product Hunt', cell_left), Paragraph('Execute PH launch, activate Google Ads $5/day, begin influencer outreach', cell_left), Paragraph('100+ sign-ups', cell_left)],
    [Paragraph('5-6', cell_style), Paragraph('Optimization', cell_left), Paragraph('Set up analytics, A/B test landing page, optimize conversion funnel', cell_left), Paragraph('Data-driven insights', cell_left)],
    [Paragraph('7-8', cell_style), Paragraph('Growth', cell_left), Paragraph('Scale ads based on ROAS, activate referral program, iterate on feedback', cell_left), Paragraph('500+ users, $500+ MRR', cell_left)],
    [Paragraph('9-12', cell_style), Paragraph('Scale', cell_left), Paragraph('Expand to new channels, plan Fashion Point integration, consider paid features', cell_left), Paragraph('2,000+ users, $2K+ MRR', cell_left)],
]
tl_table = Table(timeline_data, colWidths=[50, 80, 210, 130])
tl_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
    ('BACKGROUND', (0,4), (-1,4), TABLE_ROW_ODD),
    ('BACKGROUND', (0,6), (-1,6), TABLE_ROW_ODD),
]))
story.append(Spacer(1, 18))
story.append(tl_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 8.</b> 12-Week Execution Timeline', caption_style))
story.append(Spacer(1, 18))

# ====== RISKS ======
story.append(Paragraph('<b>8. Risk Assessment and Mitigation</b>', h1_style))
story.append(Spacer(1, 6))

risk_data = [
    [Paragraph('<b>Risk</b>', header_cell), Paragraph('<b>Probability</b>', header_cell), Paragraph('<b>Impact</b>', header_cell), Paragraph('<b>Mitigation</b>', header_cell)],
    [Paragraph('Low user acquisition', cell_left), Paragraph('Medium', cell_style), Paragraph('High', cell_style), Paragraph('Diversify channels, improve landing page, test different audience segments', cell_left)],
    [Paragraph('Poor free-to-paid conversion', cell_left), Paragraph('Medium', cell_style), Paragraph('High', cell_style), Paragraph('Add more value to paid tiers, implement trial periods, optimize paywall timing', cell_left)],
    [Paragraph('AI costs exceed projections', cell_left), Paragraph('Low', cell_style), Paragraph('Medium', cell_style), Paragraph('Implement caching, use cheaper models for simple tasks, set rate limits', cell_left)],
    [Paragraph('Clerk/Supabase costs at scale', cell_left), Paragraph('Low', cell_style), Paragraph('Low', cell_style), Paragraph('Free tiers cover first 10K+ users; plan upgrades well ahead of limits', cell_left)],
    [Paragraph('Negative user feedback', cell_left), Paragraph('Medium', cell_style), Paragraph('Medium', cell_style), Paragraph('Implement feedback loops, iterate quickly, focus on core value proposition', cell_left)],
    [Paragraph('Competition from dating apps', cell_left), Paragraph('Low', cell_style), Paragraph('Medium', cell_style), Paragraph('DateWise is a companion, not a competitor; position as preparation layer', cell_left)],
]
risk_table = Table(risk_data, colWidths=[130, 80, 60, 200])
risk_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
    ('BACKGROUND', (0,4), (-1,4), TABLE_ROW_ODD),
    ('BACKGROUND', (0,6), (-1,6), TABLE_ROW_ODD),
]))
story.append(Spacer(1, 18))
story.append(risk_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 9.</b> Risk Assessment Matrix', caption_style))
story.append(Spacer(1, 18))

# ====== FASHION POINT ======
story.append(Paragraph('<b>9. Future Vision: Fashion Point Ecosystem</b>', h1_style))
story.append(Spacer(1, 6))
story.append(Paragraph(
    'Fashion Point, the planned AI stylist companion app, is the natural second product in the DateWise '
    'ecosystem. The strategic value of Fashion Point extends far beyond its standalone revenue potential. '
    'When a user prepares for a date using DateWise (compatibility analysis, date plan, conversation guide) '
    'and then uses Fashion Point to get an AI-curated outfit recommendation, the two products create a '
    'cross-selling flywheel. DateWise drives users to Fashion Point ("your date plan suggests a smart casual '
    'outfit, let Fashion Point help"), and Fashion Point drives users back to DateWise ("great outfit, now '
    'prepare your conversation").',
    body_style
))
story.append(Paragraph(
    'The shared user database (Clerk authentication, Supabase profiles) means Fashion Point launches with '
    'zero friction for existing DateWise users. A unified subscription ($24.99/month for both apps) creates '
    'stronger retention through multi-product lock-in. The target launch window for Fashion Point is Month 4-6, '
    'contingent on DateWise achieving product-market fit signals: 500+ monthly active users, 5%+ free-to-paid '
    'conversion, and positive user feedback on date preparation quality.',
    body_style
))

# ====== ENV CHECKLIST ======
story.append(Spacer(1, 18))
story.append(Paragraph('<b>10. Deployment Environment Variables Checklist</b>', h1_style))
story.append(Spacer(1, 6))
story.append(Paragraph(
    'The following table lists every environment variable required for a successful production deployment. '
    'Each variable must be configured in both the local .env file (for development) and the Vercel project '
    'settings (for production). Missing any of these variables will cause the corresponding feature to fail '
    'or fall back to demo mode.',
    body_style
))

env_data = [
    [Paragraph('<b>Variable</b>', header_cell), Paragraph('<b>Current Value</b>', header_cell), Paragraph('<b>Status</b>', header_cell)],
    [Paragraph('DATABASE_URL', cell_left), Paragraph('SQLite (local)', cell_style), Paragraph('Needs Supabase URL', cell_left)],
    [Paragraph('DIRECT_URL', cell_left), Paragraph('Not set', cell_style), Paragraph('Needs Supabase pooler URL', cell_left)],
    [Paragraph('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', cell_left), Paragraph('pk_test_...', cell_style), Paragraph('TEST key - upgrade before launch', cell_left)],
    [Paragraph('CLERK_SECRET_KEY', cell_left), Paragraph('sk_test_...', cell_style), Paragraph('TEST key - upgrade before launch', cell_left)],
    [Paragraph('RAZORPAY_KEY_ID', cell_left), Paragraph('rzp_live_...', cell_style), Paragraph('Production ready', cell_left)],
    [Paragraph('RAZORPAY_KEY_SECRET', cell_left), Paragraph('o3lKj2...', cell_style), Paragraph('Production ready', cell_left)],
]
env_table = Table(env_data, colWidths=[195, 145, 140])
env_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
    ('BACKGROUND', (0,4), (-1,4), TABLE_ROW_ODD),
    ('BACKGROUND', (0,6), (-1,6), TABLE_ROW_ODD),
]))
story.append(Spacer(1, 18))
story.append(env_table)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 10.</b> Environment Variables Status', caption_style))
story.append(Spacer(1, 18))

# ====== BUILD =====
doc.build(story)
print(f"PDF generated: {OUTPUT_PATH}")

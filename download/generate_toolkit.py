#!/usr/bin/env python3
"""
Practical Execution Guide: Exact Tools, Databases, Hosting, Costs & Setup Steps
For: Fashion Point & Dating Coach
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    Paragraph, Spacer, PageBreak, Table, TableStyle
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.platypus import SimpleDocTemplate
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ============================================================
# Font Registration
# ============================================================
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
pdfmetrics.registerFont(TTFont('Calibri', '/usr/share/fonts/truetype/english/calibri-regular.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')
registerFontFamily('Calibri', normal='Calibri', bold='Calibri')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ============================================================
# Colors
# ============================================================
DARK_BLUE = colors.HexColor('#1F4E79')
ACCENT_BLUE = colors.HexColor('#2980B9')
LIGHT_BLUE = colors.HexColor('#D6EAF8')
TABLE_HEADER_COLOR = DARK_BLUE
TABLE_ROW_ODD = colors.HexColor('#F5F5F5')

# ============================================================
# Styles
# ============================================================
cover_title_style = ParagraphStyle(
    name='CoverTitle', fontName='Times New Roman', fontSize=32, leading=40,
    alignment=TA_CENTER, spaceAfter=20, textColor=DARK_BLUE,
)
cover_subtitle_style = ParagraphStyle(
    name='CoverSubtitle', fontName='Times New Roman', fontSize=16, leading=24,
    alignment=TA_CENTER, spaceAfter=12, textColor=colors.HexColor('#555555'),
)
cover_author_style = ParagraphStyle(
    name='CoverAuthor', fontName='Times New Roman', fontSize=12, leading=18,
    alignment=TA_CENTER, spaceAfter=8, textColor=colors.HexColor('#777777'),
)
h1_style = ParagraphStyle(
    name='H1', fontName='Times New Roman', fontSize=18, leading=26,
    spaceBefore=16, spaceAfter=8, textColor=DARK_BLUE,
)
h2_style = ParagraphStyle(
    name='H2', fontName='Times New Roman', fontSize=14, leading=20,
    spaceBefore=12, spaceAfter=6, textColor=ACCENT_BLUE,
)
h3_style = ParagraphStyle(
    name='H3', fontName='Times New Roman', fontSize=11, leading=16,
    spaceBefore=8, spaceAfter=4, textColor=colors.HexColor('#34495E'),
)
body_style = ParagraphStyle(
    name='Body', fontName='Times New Roman', fontSize=10, leading=16,
    alignment=TA_JUSTIFY, spaceAfter=5,
)
step_style = ParagraphStyle(
    name='Step', fontName='Times New Roman', fontSize=10, leading=16,
    alignment=TA_LEFT, leftIndent=18, spaceAfter=3,
)
header_cell_style = ParagraphStyle(
    name='HeaderCell', fontName='Times New Roman', fontSize=9.5, leading=13,
    alignment=TA_CENTER, textColor=colors.white,
)
cell_style = ParagraphStyle(
    name='Cell', fontName='Times New Roman', fontSize=9, leading=13, alignment=TA_LEFT,
)
cell_center = ParagraphStyle(
    name='CellCenter', fontName='Times New Roman', fontSize=9, leading=13, alignment=TA_CENTER,
)
caption_style = ParagraphStyle(
    name='Caption', fontName='Times New Roman', fontSize=8.5, leading=12,
    alignment=TA_CENTER, textColor=colors.HexColor('#666666'),
    spaceBefore=3, spaceAfter=6,
)

# ============================================================
# TocDocTemplate
# ============================================================
class TocDocTemplate(SimpleDocTemplate):
    def __init__(self, *args, **kwargs):
        SimpleDocTemplate.__init__(self, *args, **kwargs)
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            self.notify('TOCEntry', (level, text, self.page))


def add_heading(text, style, level=0):
    p = Paragraph(text, style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text.replace('<b>', '').replace('</b>', '')
    return p


def make_table(data, col_widths, has_header=True):
    t = Table(data, colWidths=col_widths)
    cmds = [
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]
    if has_header:
        cmds.append(('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR))
        cmds.append(('TEXTCOLOR', (0, 0), (-1, 0), colors.white))
        for i in range(1, len(data)):
            bg = colors.white if i % 2 == 1 else TABLE_ROW_ODD
            cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(cmds))
    return t


# ============================================================
# Document
# ============================================================
OUTPUT_PATH = '/home/z/my-project/download/Execution_Toolkit_Guide.pdf'
doc = TocDocTemplate(
    OUTPUT_PATH, pagesize=A4,
    leftMargin=1.5*cm, rightMargin=1.5*cm, topMargin=1.8*cm, bottomMargin=1.8*cm,
    title='Execution_Toolkit_Guide',
    author='Z.ai', creator='Z.ai',
    subject='Practical execution guide with exact tools, databases, hosting, costs and step-by-step setup for Fashion Point and Dating Coach.',
)
story = []

# ============================================================
# COVER
# ============================================================
story.append(Spacer(1, 90))
story.append(Paragraph('<b>Execution Toolkit Guide</b>', cover_title_style))
story.append(Spacer(1, 20))
story.append(Paragraph('Fashion Point &amp; Dating Coach', cover_subtitle_style))
story.append(Spacer(1, 8))
story.append(Paragraph('Exact Tools, Databases, Hosting, Costs &amp; Step-by-Step Setup', cover_subtitle_style))
story.append(Spacer(1, 50))

hr = Table([['']],  colWidths=[280])
hr.setStyle(TableStyle([
    ('LINEBELOW', (0, 0), (-1, 0), 2, DARK_BLUE),
    ('TOPPADDING', (0, 0), (-1, -1), 0),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
]))
story.append(hr)
story.append(Spacer(1, 30))
story.append(Paragraph('Everything you need to start building today', cover_author_style))
story.append(Paragraph('April 2026', cover_author_style))
story.append(PageBreak())

# ============================================================
# TOC
# ============================================================
story.append(Paragraph('<b>Table of Contents</b>', h1_style))
story.append(Spacer(1, 10))
toc = TableOfContents()
toc.levelStyles = [
    ParagraphStyle(name='TOC1', fontSize=11, leftIndent=20, fontName='Times New Roman', leading=18, spaceBefore=3),
    ParagraphStyle(name='TOC2', fontSize=10, leftIndent=40, fontName='Times New Roman', leading=16, spaceBefore=2),
]
story.append(toc)
story.append(PageBreak())

# ============================================================
# 1. COMPLETE TECHNOLOGY STACK
# ============================================================
story.append(add_heading('<b>1. Complete Technology Stack</b>', h1_style, 0))
story.append(Spacer(1, 4))
story.append(Paragraph(
    'Below is the exact technology stack for both products. Every tool listed has a free tier that is sufficient '
    'to get started. You will not need to pay for anything in Month 1 unless you exceed free tier limits, which is '
    'unlikely with early user numbers.',
    body_style
))
story.append(Spacer(1, 6))

stack_data = [
    [Paragraph('<b>Component</b>', header_cell_style),
     Paragraph('<b>Tool</b>', header_cell_style),
     Paragraph('<b>Free Tier</b>', header_cell_style),
     Paragraph('<b>Paid Cost</b>', header_cell_style),
     Paragraph('<b>Why This Tool</b>', header_cell_style)],
    [Paragraph('<b>Frontend Framework</b>', cell_style),
     Paragraph('Next.js 14+ (App Router)', cell_center),
     Paragraph('Fully free', cell_center),
     Paragraph('$0', cell_center),
     Paragraph('You already know it. Best for full-stack apps with API routes.', cell_style)],
    [Paragraph('<b>Styling</b>', cell_style),
     Paragraph('Tailwind CSS + shadcn/ui', cell_center),
     Paragraph('Fully free', cell_center),
     Paragraph('$0', cell_center),
     Paragraph('Fast to build, great defaults, professional look without design skills.', cell_style)],
    [Paragraph('<b>Database</b>', cell_style),
     Paragraph('Supabase (PostgreSQL)', cell_center),
     Paragraph('50,000 rows, 1GB storage', cell_center),
     Paragraph('$0 / $25/mo', cell_center),
     Paragraph('Postgres is rock-solid. Built-in auth, real-time, file storage. Best free tier.', cell_style)],
    [Paragraph('<b>Authentication</b>', cell_style),
     Paragraph('Clerk', cell_center),
     Paragraph('10,000 MAU', cell_center),
     Paragraph('$0 / $25/mo', cell_center),
     Paragraph('Social login, email OTP, user management out of the box. 10 min setup.', cell_style)],
    [Paragraph('<b>AI Engine</b>', cell_style),
     Paragraph('OpenAI GPT-4o + GPT-4o-mini', cell_center),
     Paragraph('No free tier', cell_center),
     Paragraph('$5-30/mo', cell_center),
     Paragraph('Best quality for styling and conversation. Use GPT-4o-mini for cheaper calls.', cell_style)],
    [Paragraph('<b>Payments</b>', cell_style),
     Paragraph('Stripe', cell_center),
     Paragraph('No monthly fee', cell_center),
     Paragraph('2.9% + $0.30/txn', cell_center),
     Paragraph('Industry standard. Supports subscriptions, one-time payments, global.', cell_style)],
    [Paragraph('<b>Email Marketing</b>', cell_style),
     Paragraph('Resend', cell_center),
     Paragraph('3,000 emails/month', cell_center),
     Paragraph('$0 / $20/mo', cell_center),
     Paragraph('Best developer experience. Simple API for transactional + marketing emails.', cell_style)],
    [Paragraph('<b>Hosting</b>', cell_style),
     Paragraph('Vercel', cell_center),
     Paragraph('100GB bandwidth', cell_center),
     Paragraph('$0 / $20/mo', cell_center),
     Paragraph('You already use it. Zero-config deploy for Next.js. Edge functions available.', cell_style)],
    [Paragraph('<b>Image Storage</b>', cell_style),
     Paragraph('Supabase Storage', cell_center),
     Paragraph('1GB', cell_center),
     Paragraph('$0 / $25/mo', cell_center),
     Paragraph('Store user uploads (profile photos, outfit images). Part of Supabase.', cell_style)],
    [Paragraph('<b>Product Search</b>', cell_style),
     Paragraph('SerpAPI / Amazon PA-API', cell_center),
     Paragraph('100 searches/month', cell_center),
     Paragraph('$0-50/mo', cell_center),
     Paragraph('Search Amazon for products to recommend. SerpAPI is easier to integrate.', cell_style)],
    [Paragraph('<b>Maps/Places</b>', cell_style),
     Paragraph('Google Places API', cell_center),
     Paragraph('$200 free credit/mo', cell_center),
     Paragraph('$0 (free credit)', cell_center),
     Paragraph('Suggest date venues based on location, type, and budget.', cell_style)],
    [Paragraph('<b>Analytics</b>', cell_style),
     Paragraph('PostHog', cell_center),
     Paragraph('1M events/month', cell_center),
     Paragraph('$0 / $25/mo', cell_center),
     Paragraph('Track user behavior, feature usage, conversion funnels. Open source.', cell_style)],
    [Paragraph('<b>Domain</b>', cell_style),
     Paragraph('Cloudflare Registrar', cell_center),
     Paragraph('N/A', cell_center),
     Paragraph('$10-15/year', cell_center),
     Paragraph('Cheapest domain registration. Free DNS, free SSL, CDN included.', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(stack_data, [80, 88, 80, 75, 190]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 1: Complete technology stack with free tier limits and paid costs', caption_style))
story.append(Spacer(1, 12))

# ============================================================
# 2. DATABASE SCHEMA
# ============================================================
story.append(add_heading('<b>2. Database Design (Supabase PostgreSQL)</b>', h1_style, 0))
story.append(Spacer(1, 4))
story.append(Paragraph(
    'You need ONE Supabase project for both products. Supabase gives you PostgreSQL, authentication, file storage, '
    'and real-time subscriptions all in one. Below are the exact tables you need. Create these in the Supabase SQL Editor.',
    body_style
))
story.append(Spacer(1, 6))

story.append(add_heading('<b>2.1 Dating Coach Tables</b>', h2_style, 1))
story.append(Spacer(1, 4))

db1_data = [
    [Paragraph('<b>Table Name</b>', header_cell_style),
     Paragraph('<b>Key Columns</b>', header_cell_style),
     Paragraph('<b>Purpose</b>', header_cell_style)],
    [Paragraph('user_profiles', cell_style),
     Paragraph('id, clerk_user_id, name, gender, age_range, height, body_type, skin_tone, budget_range, communication_style, humor_style, love_language, deal_breakers (jsonb), interests (jsonb), lifestyle (jsonb), dating_goals, created_at, updated_at', cell_style),
     Paragraph('Deep user profile for personalization. JSONB fields store flexible data like interests array and deal breakers list.', cell_style)],
    [Paragraph('dates', cell_style),
     Paragraph('id, user_id, date_with_name, date_platform, date_bio_text, occasion_type, date_number (1st, 2nd...), location, budget, scheduled_at, status (planned/completed/cancelled)', cell_style),
     Paragraph('Each date a user plans. Stores info about the date for compatibility analysis.', cell_style)],
    [Paragraph('compatibility_reports', cell_style),
     Paragraph('id, date_id, user_id, compatibility_score, alignment_areas (jsonb), friction_points (jsonb), talking_points (jsonb), topics_to_avoid (jsonb), compliments (jsonb), conversation_steer (jsonb), ai_model, created_at', cell_style),
     Paragraph('AI-generated compatibility analysis. JSONB stores structured AI output.', cell_style)],
    [Paragraph('date_plans', cell_style),
     Paragraph('id, date_id, venue_name, venue_address, venue_maps_url, timing_suggestion, outfit_description, budget_estimate, activity_suggestions (jsonb)', cell_style),
     Paragraph('The actual date plan with venue, timing, and outfit suggestions.', cell_style)],
    [Paragraph('post_date_debriefs', cell_style),
     Paragraph('id, date_id, user_id, rating (1-5), what_went_well, what_was_awkward, surprises, ai_analysis (jsonb), follow_up_message_text, created_at', cell_style),
     Paragraph('After-date analysis. Stores both user feedback and AI-generated insights.', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(db1_data, [90, 210, 190]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 2: Dating Coach database tables', caption_style))
story.append(Spacer(1, 10))

story.append(add_heading('<b>2.2 Fashion Point Tables</b>', h2_style, 1))
story.append(Spacer(1, 4))

db2_data = [
    [Paragraph('<b>Table Name</b>', header_cell_style),
     Paragraph('<b>Key Columns</b>', header_cell_style),
     Paragraph('<b>Purpose</b>', header_cell_style)],
    [Paragraph('fp_user_profiles', cell_style),
     Paragraph('id, clerk_user_id, name, gender, age_range, height, weight, body_type, skin_tone, style_preferences (jsonb), budget_range, size_preferences (jsonb), brand_preferences (jsonb)', cell_style),
     Paragraph('Fashion-specific user profile. Separate from dating profile for clean separation.', cell_style)],
    [Paragraph('style_requests', cell_style),
     Paragraph('id, user_id, occasion_type, occasion_detail, season, location, time_of_day, dress_code, additional_notes', cell_style),
     Paragraph('Each styling request. The "what do I wear for X?" input.', cell_style)],
    [Paragraph('outfit_recommendations', cell_style),
     Paragraph('id, request_id, user_id, full_outfit_description (jsonb), items (jsonb array with: category, description, color, why_this_piece, product_search_query, product_url, product_price, product_brand, product_image_url), ai_model, created_at', cell_style),
     Paragraph('The AI-generated outfit. Items is a JSONB array of individual clothing pieces with product links.', cell_style)],
    [Paragraph('saved_looks', cell_style),
     Paragraph('id, user_id, outfit_id, saved_at, tags (jsonb)', cell_style),
     Paragraph('Outfits the user bookmarked for future reference.', cell_style)],
    [Paragraph('wardrobe_items', cell_style),
     Paragraph('id, user_id, category, brand, color, image_url, purchased_date, notes (for V2)', cell_style),
     Paragraph('User existing wardrobe items (Version 2 feature). Pre-build the table now.', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(db2_data, [90, 215, 185]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 3: Fashion Point database tables', caption_style))
story.append(Spacer(1, 10))

story.append(add_heading('<b>2.3 Shared Tables</b>', h2_style, 1))
story.append(Spacer(1, 4))

db3_data = [
    [Paragraph('<b>Table Name</b>', header_cell_style),
     Paragraph('<b>Key Columns</b>', header_cell_style),
     Paragraph('<b>Purpose</b>', header_cell_style)],
    [Paragraph('subscriptions', cell_style),
     Paragraph('id, clerk_user_id, stripe_customer_id, stripe_subscription_id, plan (free/starter/pro/vip), status (active/cancelled/past_due), current_period_start, current_period_end, created_at', cell_style),
     Paragraph('Track user subscription status. Links Clerk user to Stripe subscription.', cell_style)],
    [Paragraph('api_usage_logs', cell_style),
     Paragraph('id, user_id, product (dating_coach/fashion_point), action, tokens_used, cost_usd, created_at', cell_style),
     Paragraph('Track AI API usage per user for rate limiting on free tier and cost monitoring.', cell_style)],
    [Paragraph('waitlist_signups', cell_style),
     Paragraph('id, email, product_interest, source (landing_page/mini_tool/referral), created_at', cell_style),
     Paragraph('Pre-launch email collection. Track which source each signup came from.', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(db3_data, [95, 200, 195]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 4: Shared database tables', caption_style))
story.append(Spacer(1, 6))

story.append(Paragraph(
    '<b>Why Supabase over Firebase?</b> Supabase uses PostgreSQL which gives you proper relationships (JOINs), '
    'JSONB columns for flexible data, row-level security policies, and you can write raw SQL when needed. Firebase '
    'uses NoSQL which makes complex queries and relationships difficult. Since both products have relational data '
    '(user has many dates, date has one compatibility report, etc.), PostgreSQL is the right choice.',
    body_style
))
story.append(Spacer(1, 12))

# ============================================================
# 3. WHERE TO HOST
# ============================================================
story.append(add_heading('<b>3. Where to Host Everything</b>', h1_style, 0))
story.append(Spacer(1, 4))

story.append(Paragraph(
    'Since you already use Vercel, the hosting setup is straightforward. Everything runs on free tiers initially. '
    'Here is exactly where each component lives:',
    body_style
))
story.append(Spacer(1, 6))

host_data = [
    [Paragraph('<b>Component</b>', header_cell_style),
     Paragraph('<b>Host</b>', header_cell_style),
     Paragraph('<b>Cost</b>', header_cell_style),
     Paragraph('<b>Setup</b>', header_cell_style)],
    [Paragraph('Frontend + API Routes', cell_style),
     Paragraph('Vercel (Hobby Plan)', cell_center),
     Paragraph('$0/month', cell_center),
     Paragraph('Connect GitHub repo to Vercel. Auto-deploys on push. You already do this.', cell_style)],
    [Paragraph('Database + Auth + Storage', cell_style),
     Paragraph('Supabase (Free Plan)', cell_center),
     Paragraph('$0/month', cell_center),
     Paragraph('Create project at supabase.com. Get connection string. Add to .env file.', cell_style)],
    [Paragraph('AI API', cell_style),
     Paragraph('OpenAI API (remote)', cell_center),
     Paragraph('$5-30/month', cell_center),
     Paragraph('Get API key from platform.openai.com. Add to .env file. Call from API routes.', cell_style)],
    [Paragraph('Payments', cell_style),
     Paragraph('Stripe (remote)', cell_center),
     Paragraph('$0/month (2.9%/txn)', cell_center),
     Paragraph('Create account at stripe.com. Add webhook endpoint to your API routes.', cell_style)],
    [Paragraph('Emails', cell_style),
     Paragraph('Resend (remote)', cell_center),
     Paragraph('$0/month (3K emails)', cell_center),
     Paragraph('Create account at resend.com. Add API key to .env. Send from API routes.', cell_style)],
    [Paragraph('Domain', cell_style),
     Paragraph('Cloudflare Registrar', cell_center),
     Paragraph('$10-15/year', cell_center),
     Paragraph('Buy domain. Point DNS to Vercel. Vercel auto-configures SSL.', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(host_data, [95, 100, 80, 210]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 5: Hosting setup for all components', caption_style))
story.append(Spacer(1, 6))

story.append(Paragraph(
    '<b>Total infrastructure cost: $0/month</b> on free tiers. You only start paying when you exceed free limits, '
    'which typically happens around 1,000+ monthly active users. By that point, you should be generating enough '
    'subscription revenue to cover costs comfortably.',
    body_style
))
story.append(Spacer(1, 6))

story.append(add_heading('<b>3.1 Environment Variables (.env file)</b>', h2_style, 1))
story.append(Spacer(1, 4))
story.append(Paragraph(
    'All sensitive configuration lives in environment variables. Create a .env.local file in your Next.js project '
    'root. NEVER commit this file to Git. Here are the exact variables you need:',
    body_style
))
story.append(Spacer(1, 4))

env_data = [
    [Paragraph('<b>Variable</b>', header_cell_style),
     Paragraph('<b>Where to Get It</b>', header_cell_style),
     Paragraph('<b>What It Does</b>', header_cell_style)],
    [Paragraph('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', cell_style),
     Paragraph('Clerk Dashboard - API Keys', cell_style),
     Paragraph('Enables Clerk authentication in the browser', cell_style)],
    [Paragraph('CLERK_SECRET_KEY', cell_style),
     Paragraph('Clerk Dashboard - API Keys', cell_style),
     Paragraph('Server-side Clerk authentication verification', cell_style)],
    [Paragraph('NEXT_PUBLIC_CLERK_SIGN_IN_URL', cell_style),
     Paragraph('You define this', cell_style),
     Paragraph('URL path for sign-in page (e.g., /sign-in)', cell_style)],
    [Paragraph('NEXT_PUBLIC_CLERK_SIGN_UP_URL', cell_style),
     Paragraph('You define this', cell_style),
     Paragraph('URL path for sign-up page (e.g., /sign-up)', cell_style)],
    [Paragraph('SUPABASE_URL', cell_style),
     Paragraph('Supabase Dashboard - Settings', cell_style),
     Paragraph('Database connection URL', cell_style)],
    [Paragraph('SUPABASE_ANON_KEY', cell_style),
     Paragraph('Supabase Dashboard - Settings', cell_style),
     Paragraph('Public API key for Supabase client', cell_style)],
    [Paragraph('SUPABASE_SERVICE_ROLE_KEY', cell_style),
     Paragraph('Supabase Dashboard - Settings', cell_style),
     Paragraph('Admin API key (server-side only, bypasses RLS)', cell_style)],
    [Paragraph('OPENAI_API_KEY', cell_style),
     Paragraph('platform.openai.com - API Keys', cell_style),
     Paragraph('Access to GPT-4o and GPT-4o-mini models', cell_style)],
    [Paragraph('STRIPE_SECRET_KEY', cell_style),
     Paragraph('Stripe Dashboard - Developers', cell_style),
     Paragraph('Server-side Stripe API access', cell_style)],
    [Paragraph('STRIPE_WEBHOOK_SECRET', cell_style),
     Paragraph('Stripe Dashboard - Webhooks', cell_style),
     Paragraph('Verify webhook events from Stripe', cell_style)],
    [Paragraph('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', cell_style),
     Paragraph('Stripe Dashboard - Developers', cell_style),
     Paragraph('Client-side Stripe integration', cell_style)],
    [Paragraph('RESEND_API_KEY', cell_style),
     Paragraph('resend.com - API Keys', cell_style),
     Paragraph('Send transactional and marketing emails', cell_style)],
    [Paragraph('GOOGLE_PLACES_API_KEY', cell_style),
     Paragraph('Google Cloud Console', cell_style),
     Paragraph('Search for date venues (Dating Coach)', cell_style)],
    [Paragraph('SERP_API_KEY', cell_style),
     Paragraph('serpapi.com - Account', cell_style),
     Paragraph('Search for fashion products (Fashion Point)', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(env_data, [140, 135, 215]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 6: Complete environment variables list', caption_style))
story.append(Spacer(1, 12))

# ============================================================
# 4. WHERE TO SELL
# ============================================================
story.append(add_heading('<b>4. Where to Sell &amp; How to Get Paid</b>', h1_style, 0))
story.append(Spacer(1, 4))
story.append(Paragraph(
    '"Where to sell" has two parts: where users discover your products (distribution) and how they pay you '
    '(payment processing). Both are covered below with specific platforms and setup instructions.',
    body_style
))
story.append(Spacer(1, 6))

story.append(add_heading('<b>4.1 User Acquisition Channels (Where Users Find You)</b>', h2_style, 1))
story.append(Spacer(1, 4))

acq_data = [
    [Paragraph('<b>Channel</b>', header_cell_style),
     Paragraph('<b>Cost</b>', header_cell_style),
     Paragraph('<b>Traffic</b>', header_cell_style),
     Paragraph('<b>How to Set Up</b>', header_cell_style)],
    [Paragraph('<b>Product Hunt</b>', cell_style),
     Paragraph('$0', cell_center),
     Paragraph('5K-50K day 1', cell_center),
     Paragraph('Create account. Submit product with: name, tagline, description, thumbnail, demo video/GIF. Launch Tue-Thu morning PST.', cell_style)],
    [Paragraph('<b>Reddit</b>', cell_style),
     Paragraph('$0', cell_center),
     Paragraph('500-5K/post', cell_center),
     Paragraph('Post in r/dating_advice, r/dating, r/malefashionadvice, r/femalefashionadvice. Share genuine value. Respond to all comments.', cell_style)],
    [Paragraph('<b>Pinterest</b>', cell_style),
     Paragraph('$0', cell_center),
     Paragraph('1K-10K/month', cell_center),
     Paragraph('Create outfit boards and dating tip pins linking to your site. Use Tailwind free scheduler. 10-20 pins/week.', cell_style)],
    [Paragraph("<b>There's An AI For That</b>", cell_style),
     Paragraph('$0', cell_center),
     Paragraph('500-5K', cell_center),
     Paragraph('Submit at theresanaiforthat.com/submit. Free listing. 5M+ monthly visitors.', cell_style)],
    [Paragraph('<b>Indie Hackers</b>', cell_style),
     Paragraph('$0', cell_center),
     Paragraph('200-2K', cell_center),
     Paragraph('Post your build story with revenue numbers. Community loves authentic builder stories.', cell_style)],
    [Paragraph('<b>Hacker News</b>', cell_style),
     Paragraph('$0', cell_center),
     Paragraph('1K-30K', cell_center),
     Paragraph('Post as "Show HN: AI Dating Coach". Share implementation details for technical audience.', cell_style)],
    [Paragraph('<b>Google SEO</b>', cell_style),
     Paragraph('$0', cell_center),
     Paragraph('1K-10K/month', cell_center),
     Paragraph('Write blog posts targeting search queries. Next.js blog with SSR. Submit sitemap to Google Search Console.', cell_style)],
    [Paragraph('<b>Twitter/X</b>', cell_style),
     Paragraph('$0', cell_center),
     Paragraph('100-1K/month', cell_center),
     Paragraph('Post progress updates, screenshots, testimonials daily or weekly. #BuildInPublic #IndieHackers.', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(acq_data, [80, 35, 65, 290]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 7: User acquisition channels with setup instructions', caption_style))
story.append(Spacer(1, 10))

story.append(add_heading('<b>4.2 Payment Processing (How You Get Paid)</b>', h2_style, 1))
story.append(Spacer(1, 4))

pay_data = [
    [Paragraph('<b>Revenue Type</b>', header_cell_style),
     Paragraph('<b>Platform</b>', header_cell_style),
     Paragraph('<b>Setup Steps</b>', header_cell_style),
     Paragraph('<b>Fees</b>', header_cell_style)],
    [Paragraph('Subscriptions', cell_style),
     Paragraph('Stripe', cell_center),
     Paragraph('1. Create Stripe account<br/>2. Create Products + Prices in Dashboard<br/>3. Use Stripe Checkout API in Next.js<br/>4. Add webhook endpoint<br/>5. Test with test cards', cell_style),
     Paragraph('2.9% + $0.30/txn', cell_style)],
    [Paragraph('One-time fees', cell_style),
     Paragraph('Stripe', cell_center),
     Paragraph('Same Stripe account. Create one-time PaymentIntents.', cell_style),
     Paragraph('2.9% + $0.30/txn', cell_style)],
    [Paragraph('Affiliate commissions', cell_style),
     Paragraph('Amazon Associates', cell_center),
     Paragraph('1. Sign up at affiliate-program.amazon.com<br/>2. Get affiliate tracking ID<br/>3. Generate product links<br/>4. Embed in recommendations<br/>5. Track earnings in dashboard', cell_style),
     Paragraph('1-10% of sale', cell_style)],
    [Paragraph('Consulting', cell_style),
     Paragraph('Stripe / Bank', cell_center),
     Paragraph('Stripe invoicing or direct bank transfer for local clients.', cell_style),
     Paragraph('Varies', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(pay_data, [80, 70, 230, 110]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 8: Payment processing setup for all revenue types', caption_style))
story.append(Spacer(1, 10))

story.append(add_heading('<b>4.3 Affiliate Programs to Join (Fashion Point)</b>', h2_style, 1))
story.append(Spacer(1, 4))

aff_data = [
    [Paragraph('<b>Program</b>', header_cell_style),
     Paragraph('<b>Commission</b>', header_cell_style),
     Paragraph('<b>Sign Up URL</b>', header_cell_style),
     Paragraph('<b>Cookie Duration</b>', header_cell_style)],
    [Paragraph('Amazon Associates', cell_style),
     Paragraph('1-10%', cell_center),
     Paragraph('affiliate-program.amazon.com', cell_center),
     Paragraph('24 hours', cell_center)],
    [Paragraph('Myntra (India)', cell_style),
     Paragraph('5-15%', cell_center),
     Paragraph('via CueLinks or vCommission', cell_center),
     Paragraph('30 days', cell_center)],
    [Paragraph('AJIO (India)', cell_style),
     Paragraph('5-12%', cell_center),
     Paragraph('via CueLinks or vCommission', cell_center),
     Paragraph('30 days', cell_center)],
    [Paragraph('ASOS', cell_style),
     Paragraph('5-10%', cell_center),
     Paragraph('via AWIN or CJ', cell_center),
     Paragraph('30 days', cell_center)],
    [Paragraph('H&amp;M', cell_style),
     Paragraph('5-8%', cell_center),
     Paragraph('via AWIN or CJ', cell_center),
     Paragraph('30 days', cell_center)],
]
story.append(Spacer(1, 6))
story.append(make_table(aff_data, [80, 75, 200, 145]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 9: Affiliate programs for Fashion Point product links', caption_style))
story.append(Spacer(1, 6))

story.append(Paragraph(
    '<b>Recommendation:</b> Start with Amazon Associates only. It has the largest product catalog, easiest API '
    'integration, and global reach. Add other affiliate programs later as you scale and understand which brands '
    'your users prefer. You do not need all of them on day one.',
    body_style
))
story.append(Spacer(1, 12))

# ============================================================
# 5. TOTAL BUDGET BREAKDOWN
# ============================================================
story.append(add_heading('<b>5. Total Budget Breakdown</b>', h1_style, 0))
story.append(Spacer(1, 4))

story.append(Paragraph(
    'This is the complete, honest budget. I have broken it into three phases: Month 1 (validation), Months 2-3 '
    '(MVP development), and Months 4-6 (growth). Everything that can be free IS free. You only pay for what '
    'cannot be avoided.',
    body_style
))
story.append(Spacer(1, 6))

story.append(add_heading('<b>5.1 One-Time Setup Costs</b>', h2_style, 1))
story.append(Spacer(1, 4))

one_time_data = [
    [Paragraph('<b>Item</b>', header_cell_style),
     Paragraph('<b>Cost</b>', header_cell_style),
     Paragraph('<b>When</b>', header_cell_style),
     Paragraph('<b>Notes</b>', header_cell_style)],
    [Paragraph('Domain (dating coach)', cell_style),
     Paragraph('$10-15/year', cell_center),
     Paragraph('Month 2', cell_center),
     Paragraph('Buy when MVP is ready. Use .vercel.app subdomain during development for free.', cell_style)],
    [Paragraph('Domain (fashion point)', cell_style),
     Paragraph('$10-15/year', cell_center),
     Paragraph('Month 3', cell_center),
     Paragraph('Same as above. Or use subdomain like fashion.yourdomain.com.', cell_style)],
    [Paragraph('<b>Total One-Time</b>', cell_style),
     Paragraph('<b>$20-30/year</b>', cell_center),
     Paragraph('', cell_center),
     Paragraph('', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(one_time_data, [120, 75, 65, 230]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 10: One-time setup costs', caption_style))
story.append(Spacer(1, 10))

story.append(add_heading('<b>5.2 Monthly Operating Costs by Phase</b>', h2_style, 1))
story.append(Spacer(1, 4))

monthly_data = [
    [Paragraph('<b>Expense</b>', header_cell_style),
     Paragraph('<b>Month 1</b>', header_cell_style),
     Paragraph('<b>Months 2-3</b>', header_cell_style),
     Paragraph('<b>Months 4-6</b>', header_cell_style),
     Paragraph('<b>Notes</b>', header_cell_style)],
    [Paragraph('Supabase', cell_style),
     Paragraph('$0', cell_center), Paragraph('$0', cell_center), Paragraph('$0-25', cell_center),
     Paragraph('Free: 50K rows, 1GB. Pro ($25) at 1K+ active users.', cell_style)],
    [Paragraph('Clerk Auth', cell_style),
     Paragraph('$0', cell_center), Paragraph('$0', cell_center), Paragraph('$0-25', cell_center),
     Paragraph('Free: 10K MAU. Pro ($25) at 10K+ monthly users.', cell_style)],
    [Paragraph('Vercel Hosting', cell_style),
     Paragraph('$0', cell_center), Paragraph('$0', cell_center), Paragraph('$0-20', cell_center),
     Paragraph('Free Hobby plan sufficient until Pro ($20) needed.', cell_style)],
    [Paragraph('OpenAI API', cell_style),
     Paragraph('$0-5', cell_center), Paragraph('$5-15', cell_center), Paragraph('$15-50', cell_center),
     Paragraph('Mini-tool in M1 minimal. MVP uses more. Growth scales with users.', cell_style)],
    [Paragraph('Stripe', cell_style),
     Paragraph('$0', cell_center), Paragraph('$0', cell_center), Paragraph('$0', cell_center),
     Paragraph('No monthly fee. Only 2.9% + $0.30 per transaction.', cell_style)],
    [Paragraph('Resend (Email)', cell_style),
     Paragraph('$0', cell_center), Paragraph('$0', cell_center), Paragraph('$0-20', cell_center),
     Paragraph('Free: 3,000 emails/month. Pro ($20) at higher volume.', cell_style)],
    [Paragraph('SerpAPI', cell_style),
     Paragraph('$0', cell_center), Paragraph('$0', cell_center), Paragraph('$0-50', cell_center),
     Paragraph('Free: 100 searches/month. Fashion Point product search only.', cell_style)],
    [Paragraph('Google Places API', cell_style),
     Paragraph('$0', cell_center), Paragraph('$0', cell_center), Paragraph('$0-10', cell_center),
     Paragraph('$200 free credit/month. More than enough early.', cell_style)],
    [Paragraph('PostHog Analytics', cell_style),
     Paragraph('$0', cell_center), Paragraph('$0', cell_center), Paragraph('$0', cell_center),
     Paragraph('Free: 1M events/month. Extremely generous.', cell_style)],
    [Paragraph('Tailwind Scheduler', cell_style),
     Paragraph('$0', cell_center), Paragraph('$0', cell_center), Paragraph('$0', cell_center),
     Paragraph('Free tier: 30 pins/week with scheduling.', cell_style)],
    [Paragraph('<b>TOTAL MONTHLY</b>', cell_style),
     Paragraph('<b>$0-5</b>', cell_center), Paragraph('<b>$5-15</b>', cell_center), Paragraph('<b>$10-50</b>', cell_center),
     Paragraph('', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(monthly_data, [85, 65, 65, 65, 260]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 11: Monthly operating costs by growth phase', caption_style))
story.append(Spacer(1, 10))

story.append(add_heading('<b>5.3 Total Budget Summary</b>', h2_style, 1))
story.append(Spacer(1, 4))

total_data = [
    [Paragraph('<b>Phase</b>', header_cell_style),
     Paragraph('<b>Duration</b>', header_cell_style),
     Paragraph('<b>Monthly</b>', header_cell_style),
     Paragraph('<b>Total for Phase</b>', header_cell_style),
     Paragraph('<b>Running Total</b>', header_cell_style)],
    [Paragraph('Phase 1: Validation', cell_style),
     Paragraph('1 month', cell_center),
     Paragraph('$0-5', cell_center),
     Paragraph('$0-5', cell_center),
     Paragraph('$20-35', cell_center)],
    [Paragraph('Phase 2: MVP Build', cell_style),
     Paragraph('2 months', cell_center),
     Paragraph('$5-15', cell_center),
     Paragraph('$10-30', cell_center),
     Paragraph('$30-65', cell_center)],
    [Paragraph('Phase 3: Growth', cell_style),
     Paragraph('3 months', cell_center),
     Paragraph('$10-50', cell_center),
     Paragraph('$30-150', cell_center),
     Paragraph('$60-215', cell_center)],
    [Paragraph('<b>6-MONTH TOTAL</b>', cell_style),
     Paragraph('', cell_center),
     Paragraph('', cell_center),
     Paragraph('<b>$40-185</b>', cell_center),
     Paragraph('<b>$60-215</b>', cell_center)],
]
story.append(Spacer(1, 6))
story.append(make_table(total_data, [100, 65, 65, 85, 85]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 12: Total budget summary (including domains)', caption_style))
story.append(Spacer(1, 6))

story.append(Paragraph(
    '<b>Bottom line: You need $60-215 total for the first 6 months.</b> This includes domains, all API costs, '
    'hosting, databases, authentication, emails, analytics, and every other tool. This is exceptionally low for '
    'building two SaaS products. The low cost is possible because you are building everything yourself (no '
    'developers to pay) and using generous free tiers from modern SaaS infrastructure providers.',
    body_style
))
story.append(Spacer(1, 12))

# ============================================================
# 6. STEP-BY-STEP SETUP CHECKLIST
# ============================================================
story.append(add_heading('<b>6. Step-by-Step Setup Checklist</b>', h1_style, 0))
story.append(Spacer(1, 4))
story.append(Paragraph(
    'Follow these steps in order. Each step includes the exact URL, what to do, and what you get at the end. '
    'Complete all of Step 1 before moving to Step 2.',
    body_style
))
story.append(Spacer(1, 6))

story.append(add_heading('<b>Step 1: Create Accounts (30 minutes)</b>', h2_style, 1))
story.append(Spacer(1, 4))

step1_data = [
    [Paragraph('<b>#</b>', header_cell_style),
     Paragraph('<b>Account</b>', header_cell_style),
     Paragraph('<b>URL</b>', header_cell_style),
     Paragraph('<b>What to Do</b>', header_cell_style)],
    [Paragraph('1', cell_center), Paragraph('Supabase', cell_style),
     Paragraph('supabase.com', cell_center),
     Paragraph('Sign up with GitHub. Create project named "ecosystem". Note the Project URL and anon key.', cell_style)],
    [Paragraph('2', cell_center), Paragraph('Clerk', cell_style),
     Paragraph('clerk.com', cell_center),
     Paragraph('Sign up. Create application. Enable Email, Google, Apple sign-in. Note all keys.', cell_style)],
    [Paragraph('3', cell_center), Paragraph('OpenAI', cell_style),
     Paragraph('platform.openai.com', cell_center),
     Paragraph('Sign up. Add $10 to API balance. Generate API key. Enable GPT-4o and GPT-4o-mini.', cell_style)],
    [Paragraph('4', cell_center), Paragraph('Stripe', cell_style),
     Paragraph('stripe.com', cell_center),
     Paragraph('Sign up. Complete business details. Get publishable + secret keys. Webhook later.', cell_style)],
    [Paragraph('5', cell_center), Paragraph('Resend', cell_style),
     Paragraph('resend.com', cell_center),
     Paragraph('Sign up. Add domain or use onboarding domain. Get API key.', cell_style)],
    [Paragraph('6', cell_center), Paragraph('PostHog', cell_style),
     Paragraph('posthog.com', cell_center),
     Paragraph('Sign up. Create project. Get project API key.', cell_style)],
    [Paragraph('7', cell_center), Paragraph('Product Hunt', cell_style),
     Paragraph('producthunt.com', cell_center),
     Paragraph('Sign up. Complete bio and avatar.', cell_style)],
    [Paragraph('8', cell_center), Paragraph('Amazon Associates', cell_style),
     Paragraph('affiliate-program.amazon.com', cell_center),
     Paragraph('Sign up. Get associate tracking ID. Approval takes 1-3 days.', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(step1_data, [25, 85, 115, 265]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 13: Account creation checklist', caption_style))
story.append(Spacer(1, 10))

story.append(add_heading('<b>Step 2: Initialize the Project (1 hour)</b>', h2_style, 1))
story.append(Spacer(1, 4))

story.append(Paragraph('<b>2.1 Create Next.js project:</b>', body_style))
story.append(Paragraph('npx create-next-app@latest dating-coach --typescript --tailwind --eslint --app --src-dir', step_style))
story.append(Spacer(1, 4))

story.append(Paragraph('<b>2.2 Install dependencies:</b>', body_style))
story.append(Paragraph('npm install @clerk/nextjs @supabase/supabase-js stripe openai resend posthog-js', step_style))
story.append(Spacer(1, 4))

story.append(Paragraph('<b>2.3 Set up shadcn/ui:</b>', body_style))
story.append(Paragraph('npx shadcn@latest init (follow prompts, select default options)', step_style))
story.append(Paragraph('npx shadcn@latest add button card input label select textarea tabs dialog sheet toast', step_style))
story.append(Spacer(1, 4))

story.append(Paragraph('<b>2.4 Create .env.local file</b> with all variables from Section 3.1 (Table 6).', body_style))
story.append(Spacer(1, 4))

story.append(Paragraph('<b>2.5 Push to GitHub</b> and connect to Vercel for auto-deploy.', body_style))
story.append(Spacer(1, 10))

story.append(add_heading('<b>Step 3: Set Up Database (30 minutes)</b>', h2_style, 1))
story.append(Spacer(1, 4))

story.append(Paragraph('<b>3.1 Open Supabase SQL Editor</b> (supabase.com - SQL Editor tab).', body_style))
story.append(Spacer(1, 4))

story.append(Paragraph(
    '<b>3.2 Create all tables</b> from Section 2 (Tables 2, 3, 4). Copy the SQL for each table. Run each '
    'CREATE TABLE statement in the SQL Editor.',
    body_style
))
story.append(Spacer(1, 4))

story.append(Paragraph(
    '<b>3.3 Enable Row Level Security (RLS)</b> on all tables. Create policies so users can only read/write their '
    'own data. Example: "Users can SELECT their own profiles WHERE auth.uid() = clerk_user_id".',
    body_style
))
story.append(Spacer(1, 4))

story.append(Paragraph(
    '<b>3.4 Test database connection</b> by creating a simple API route in Next.js that queries user_profiles '
    'and returns a success message.',
    body_style
))
story.append(Spacer(1, 10))

story.append(add_heading('<b>Step 4: Set Up Authentication (20 minutes)</b>', h2_style, 1))
story.append(Spacer(1, 4))

story.append(Paragraph('<b>4.1 Wrap your app with ClerkProvider</b> in src/app/layout.tsx. Add your publishable key.', body_style))
story.append(Spacer(1, 4))

story.append(Paragraph('<b>4.2 Create auth pages:</b> src/app/sign-in/[[...sign-in]]/page.tsx and src/app/sign-up/[[...sign-up]]/page.tsx using Clerk pre-built components (SignIn and SignUp).', body_style))
story.append(Spacer(1, 4))

story.append(Paragraph('<b>4.3 Add middleware:</b> Create src/middleware.ts with Clerk middleware to protect routes. Public: /, /sign-in, /sign-up, /api/public. All others require auth.', body_style))
story.append(Spacer(1, 4))

story.append(Paragraph('<b>4.4 Test:</b> Sign up, sign in, sign out. Verify user appears in Clerk dashboard.', body_style))
story.append(Spacer(1, 10))

story.append(add_heading('<b>Step 5: Build the API Layer (2-3 hours)</b>', h2_style, 1))
story.append(Spacer(1, 4))

api_data = [
    [Paragraph('<b>API Route</b>', header_cell_style),
     Paragraph('<b>Method</b>', header_cell_style),
     Paragraph('<b>What It Does</b>', header_cell_style),
     Paragraph('<b>Input</b>', header_cell_style),
     Paragraph('<b>Output</b>', header_cell_style)],
    [Paragraph('/api/profile', cell_style),
     Paragraph('GET/POST/PUT', cell_center),
     Paragraph('CRUD for user profile', cell_style),
     Paragraph('Profile JSON', cell_style),
     Paragraph('Saved profile', cell_style)],
    [Paragraph('/api/compatibility', cell_style),
     Paragraph('POST', cell_center),
     Paragraph('Run compatibility analysis', cell_style),
     Paragraph('User profile + date info', cell_style),
     Paragraph('Score + breakdown', cell_style)],
    [Paragraph('/api/date-plan', cell_style),
     Paragraph('POST', cell_center),
     Paragraph('Generate date plan', cell_style),
     Paragraph('Compatibility + location', cell_style),
     Paragraph('Venue + timing + outfit', cell_style)],
    [Paragraph('/api/talking-points', cell_style),
     Paragraph('POST', cell_center),
     Paragraph('Conversation guide', cell_style),
     Paragraph('Compatibility report', cell_style),
     Paragraph('Icebreakers + topics', cell_style)],
    [Paragraph('/api/debrief', cell_style),
     Paragraph('POST', cell_center),
     Paragraph('Post-date analysis', cell_style),
     Paragraph('Date data + feedback', cell_style),
     Paragraph('Analysis + follow-up', cell_style)],
    [Paragraph('/api/webhooks/stripe', cell_style),
     Paragraph('POST', cell_center),
     Paragraph('Handle Stripe events', cell_style),
     Paragraph('Stripe payload', cell_style),
     Paragraph('200 OK', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(api_data, [85, 55, 115, 105, 110]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 14: Dating Coach API routes', caption_style))
story.append(Spacer(1, 6))

story.append(Paragraph(
    '<b>Important architecture note:</b> ALL AI calls (OpenAI API) must happen in API routes (server-side), '
    'NEVER in the browser. This protects your API key and gives you control over rate limiting and cost tracking. '
    'Your API routes should: (1) Authenticate the user via Clerk, (2) Fetch their profile from Supabase, '
    '(3) Call OpenAI with a carefully crafted system prompt, (4) Parse and validate the response, '
    '(5) Save to Supabase, (6) Log API usage and cost, (7) Return the result to the frontend.',
    body_style
))
story.append(Spacer(1, 12))

# ============================================================
# 7. AI PROMPT ARCHITECTURE
# ============================================================
story.append(add_heading('<b>7. AI Prompt Architecture (OpenAI API Calls)</b>', h1_style, 0))
story.append(Spacer(1, 4))
story.append(Paragraph(
    'The quality of your product depends on the quality of your AI prompts. Here is the exact prompt structure '
    'for each core feature. Use GPT-4o for quality-critical features and GPT-4o-mini for simpler tasks to save costs.',
    body_style
))
story.append(Spacer(1, 6))

prompt_data = [
    [Paragraph('<b>Feature</b>', header_cell_style),
     Paragraph('<b>Model</b>', header_cell_style),
     Paragraph('<b>Input</b>', header_cell_style),
     Paragraph('<b>Output Format</b>', header_cell_style),
     Paragraph('<b>Cost/Call</b>', header_cell_style)],
    [Paragraph('Compatibility', cell_style),
     Paragraph('GPT-4o', cell_center),
     Paragraph('User profile JSON + date profile (~2000 tokens)', cell_style),
     Paragraph('JSON: score, alignments, frictions, talking_points', cell_style),
     Paragraph('$0.02-0.05', cell_center)],
    [Paragraph('Date Planner', cell_style),
     Paragraph('GPT-4o', cell_center),
     Paragraph('Compatibility + location + budget (~1500 tokens)', cell_style),
     Paragraph('JSON: venue, timing, outfit suggestion', cell_style),
     Paragraph('$0.02-0.04', cell_center)],
    [Paragraph('Talking Points', cell_style),
     Paragraph('GPT-4o', cell_center),
     Paragraph('Both profiles + compatibility (~2000 tokens)', cell_style),
     Paragraph('JSON: icebreakers, deep_starters, avoid_topics, compliments', cell_style),
     Paragraph('$0.02-0.05', cell_center)],
    [Paragraph('Debrief', cell_style),
     Paragraph('GPT-4o-mini', cell_center),
     Paragraph('Date plan + user feedback (~1000 tokens)', cell_style),
     Paragraph('JSON: analysis, recommendation, follow_up_text', cell_style),
     Paragraph('$0.005-0.01', cell_center)],
    [Paragraph('Fashion Outfit', cell_style),
     Paragraph('GPT-4o', cell_center),
     Paragraph('User profile + occasion (~1500 tokens)', cell_style),
     Paragraph('JSON: items array with category, description, color, search_query', cell_style),
     Paragraph('$0.02-0.04', cell_center)],
    [Paragraph('Product Search', cell_style),
     Paragraph('GPT-4o-mini', cell_center),
     Paragraph('Each item description (~200 tokens)', cell_style),
     Paragraph('Optimized search strings for SerpAPI', cell_style),
     Paragraph('$0.001-0.003', cell_center)],
]
story.append(Spacer(1, 6))
story.append(make_table(prompt_data, [70, 50, 120, 140, 65]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 15: AI prompt architecture with model selection and cost per call', caption_style))
story.append(Spacer(1, 6))

story.append(Paragraph(
    '<b>Cost per complete Dating Coach session:</b> Compatibility ($0.03) + Date Plan ($0.03) + Talking Points ($0.03) '
    '+ Debrief ($0.008) = approximately $0.10 per full date cycle. At 1,000 users doing 2 dates per month, '
    'that is $200/month in AI costs. With subscription revenue of $5,000/month from those users, your AI gross '
    'margin is 96%. This is why the business model works.',
    body_style
))
story.append(Spacer(1, 12))

# ============================================================
# 8. MONETIZATION SETUP
# ============================================================
story.append(add_heading('<b>8. Monetization: Exact Pricing &amp; Setup</b>', h1_style, 0))
story.append(Spacer(1, 4))

pricing_data = [
    [Paragraph('<b>Plan</b>', header_cell_style),
     Paragraph('<b>Price</b>', header_cell_style),
     Paragraph('<b>Dating Coach Features</b>', header_cell_style),
     Paragraph('<b>Fashion Point Features</b>', header_cell_style)],
    [Paragraph('<b>Free</b>', cell_style),
     Paragraph('$0', cell_center),
     Paragraph('1 date prep/month, basic compatibility score', cell_style),
     Paragraph('1 outfit request/month, basic recommendations', cell_style)],
    [Paragraph('<b>Starter</b>', cell_style),
     Paragraph('$4.99/month', cell_center),
     Paragraph('5 date preps/month, full compatibility, talking points', cell_style),
     Paragraph('5 outfit requests/month, product links', cell_style)],
    [Paragraph('<b>Pro</b>', cell_style),
     Paragraph('$9.99/month', cell_center),
     Paragraph('Unlimited date preps, debriefs, conversation history', cell_style),
     Paragraph('Unlimited outfits, saved looks, wardrobe tracker', cell_style)],
    [Paragraph('<b>VIP</b>', cell_style),
     Paragraph('$19.99/month', cell_center),
     Paragraph('Everything + priority AI, real-time date tips, style advice', cell_style),
     Paragraph('Everything + virtual try-on, price alerts, priority styling', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(pricing_data, [50, 65, 200, 200]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 16: Pricing tiers for both products', caption_style))
story.append(Spacer(1, 6))

story.append(Paragraph(
    '<b>How to implement:</b> Create 4 Price objects in Stripe Dashboard (one for each plan). When a user clicks '
    '"Upgrade", redirect them to Stripe Checkout with the selected Price ID. After successful payment, Stripe sends '
    'a webhook to /api/webhooks/stripe. In the handler, update the user subscription status in the subscriptions '
    'table. On every page load, check subscription status and show/hide features accordingly.',
    body_style
))
story.append(Spacer(1, 12))

# ============================================================
# 9. FOLDER STRUCTURE
# ============================================================
story.append(add_heading('<b>9. Recommended Project Structure</b>', h1_style, 0))
story.append(Spacer(1, 4))
story.append(Paragraph(
    'Use a monorepo approach where both products share authentication, database, and utility code but have '
    'separate route groups in Next.js App Router. This keeps things simple while enabling code reuse.',
    body_style
))
story.append(Spacer(1, 4))

folder_data = [
    [Paragraph('<b>Path</b>', header_cell_style),
     Paragraph('<b>Purpose</b>', header_cell_style)],
    [Paragraph('src/app/(marketing)/', cell_style),
     Paragraph('Landing pages, about, pricing, blog (shared)', cell_style)],
    [Paragraph('src/app/(auth)/sign-in/', cell_style),
     Paragraph('Clerk sign-in page', cell_style)],
    [Paragraph('src/app/(auth)/sign-up/', cell_style),
     Paragraph('Clerk sign-up page', cell_style)],
    [Paragraph('src/app/dating-coach/(dashboard)/', cell_style),
     Paragraph('Dating Coach user dashboard (protected)', cell_style)],
    [Paragraph('src/app/dating-coach/(dashboard)/profile/', cell_style),
     Paragraph('User profile builder and editor', cell_style)],
    [Paragraph('src/app/dating-coach/(dashboard)/dates/', cell_style),
     Paragraph('List of planned and completed dates', cell_style)],
    [Paragraph('src/app/dating-coach/(dashboard)/dates/new/', cell_style),
     Paragraph('Create new date: input date info + run compatibility', cell_style)],
    [Paragraph('src/app/dating-coach/(dashboard)/dates/[id]/', cell_style),
     Paragraph('Date detail: plan, talking points, debrief', cell_style)],
    [Paragraph('src/app/fashion-point/(dashboard)/', cell_style),
     Paragraph('Fashion Point user dashboard (protected)', cell_style)],
    [Paragraph('src/app/fashion-point/(dashboard)/profile/', cell_style),
     Paragraph('Fashion profile (body type, style, budget)', cell_style)],
    [Paragraph('src/app/fashion-point/(dashboard)/style-request/', cell_style),
     Paragraph('New outfit request form', cell_style)],
    [Paragraph('src/app/fashion-point/(dashboard)/outfits/', cell_style),
     Paragraph('Saved outfits and history', cell_style)],
    [Paragraph('src/app/api/compatibility/route.ts', cell_style),
     Paragraph('API: Compatibility analysis endpoint', cell_style)],
    [Paragraph('src/app/api/date-plan/route.ts', cell_style),
     Paragraph('API: Date planner endpoint', cell_style)],
    [Paragraph('src/app/api/talking-points/route.ts', cell_style),
     Paragraph('API: Conversation guide endpoint', cell_style)],
    [Paragraph('src/app/api/outfit/route.ts', cell_style),
     Paragraph('API: Fashion outfit generator endpoint', cell_style)],
    [Paragraph('src/app/api/webhooks/stripe/route.ts', cell_style),
     Paragraph('API: Stripe webhook handler', cell_style)],
    [Paragraph('src/lib/supabase.ts', cell_style),
     Paragraph('Supabase client initialization', cell_style)],
    [Paragraph('src/lib/openai.ts', cell_style),
     Paragraph('OpenAI client initialization', cell_style)],
    [Paragraph('src/lib/stripe.ts', cell_style),
     Paragraph('Stripe client initialization', cell_style)],
    [Paragraph('src/lib/prompts/compatibility.ts', cell_style),
     Paragraph('System prompt for compatibility analysis', cell_style)],
    [Paragraph('src/lib/prompts/date-plan.ts', cell_style),
     Paragraph('System prompt for date planning', cell_style)],
    [Paragraph('src/lib/prompts/outfit.ts', cell_style),
     Paragraph('System prompt for outfit generation', cell_style)],
    [Paragraph('src/components/ui/', cell_style),
     Paragraph('shadcn/ui components (button, card, input, etc.)', cell_style)],
    [Paragraph('src/components/dating/', cell_style),
     Paragraph('Dating Coach specific components', cell_style)],
    [Paragraph('src/components/fashion/', cell_style),
     Paragraph('Fashion Point specific components', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(folder_data, [195, 305]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 17: Recommended project folder structure', caption_style))
story.append(Spacer(1, 12))

# ============================================================
# 10. WHAT TO DO RIGHT NOW
# ============================================================
story.append(add_heading('<b>10. What to Do Right Now (This Week)</b>', h1_style, 0))
story.append(Spacer(1, 4))
story.append(Paragraph(
    'Here is the exact action plan for this week. No more planning. Pure execution.',
    body_style
))
story.append(Spacer(1, 6))

now_data = [
    [Paragraph('<b>Day</b>', header_cell_style),
     Paragraph('<b>Time</b>', header_cell_style),
     Paragraph('<b>Task</b>', header_cell_style),
     Paragraph('<b>Deliverable</b>', header_cell_style)],
    [Paragraph('Day 1', cell_center), Paragraph('2-3 hrs', cell_center),
     Paragraph('Create all 8 accounts from Table 13. Add $10 to OpenAI. Save all API keys in a password manager.', cell_style),
     Paragraph('All accounts active, all keys saved', cell_style)],
    [Paragraph('Day 2', cell_center), Paragraph('2-3 hrs', cell_center),
     Paragraph('Initialize Next.js project. Install deps. Set up shadcn/ui. Create .env.local. Push to GitHub + Vercel.', cell_style),
     Paragraph('Project running on yourdomain.vercel.app', cell_style)],
    [Paragraph('Day 3', cell_center), Paragraph('2-3 hrs', cell_center),
     Paragraph('Set up Supabase database. Create all tables from Tables 2-4. Enable RLS. Test with API route.', cell_style),
     Paragraph('Database tables created, API route returns data', cell_style)],
    [Paragraph('Day 4', cell_center), Paragraph('2-3 hrs', cell_center),
     Paragraph('Set up Clerk auth. Create sign-in/sign-up pages. Add middleware. Test full auth flow.', cell_style),
     Paragraph('Users can sign up, sign in, access protected routes', cell_style)],
    [Paragraph('Day 5', cell_center), Paragraph('2-3 hrs', cell_center),
     Paragraph('Build Dating Coach profile builder page (multi-step form). Save to Supabase. Build display page.', cell_style),
     Paragraph('Users can create and view their dating profile', cell_style)],
    [Paragraph('Weekend', cell_center), Paragraph('5 hrs', cell_center),
     Paragraph('Build /api/compatibility API route. Connect to "New Date" page. Test with real data. Celebrate!', cell_style),
     Paragraph('Compatibility analysis works end-to-end', cell_style)],
]
story.append(Spacer(1, 6))
story.append(make_table(now_data, [55, 45, 235, 165]))
story.append(Spacer(1, 4))
story.append(Paragraph('Table 18: This week action plan', caption_style))
story.append(Spacer(1, 6))

story.append(Paragraph(
    '<b>Total time this week: 17-23 hours (within your 19-26 hour budget).</b> At the end of this week, you will have: '
    'a running Next.js app on Vercel, a working database, user authentication, profile creation, and the core AI '
    'compatibility engine. That is the foundation of your Dating Coach MVP. Everything after this is building '
    'additional features on top of this foundation.',
    body_style
))

# ============================================================
# BUILD
# ============================================================
doc.multiBuild(story)
print(f"PDF generated at: {OUTPUT_PATH}")

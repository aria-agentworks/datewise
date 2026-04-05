export type Locale = 'en' | 'es' | 'de' | 'fr' | 'pt'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  pt: 'Português',
}

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  de: '🇩🇪',
  fr: '🇫🇷',
  pt: '🇧🇷',
}

type TranslationDictionary = {
  // Navigation
  nav: {
    home: string
    dashboard: string
    newDate: string
    loading: string
  }
  // Common
  common: {
    back: string
    cancel: string
    save: string
    next: string
    previous: string
    submit: string
    retry: string
    loading: string
    saving: string
    copy: string
    copied: string
    install: string
    search: string
    close: string
    error: string
    tryAgain: string
  }
  // Auth
  auth: {
    backToHome: string
    welcomeBack: string
    signInSubtitle: string
    createAccount: string
    signUpSubtitle: string
    continueAsGuest: string
  }
  // Landing Page
  landing: {
    heroBadge: string
    heroTitle1: string
    heroTitleHighlight: string
    heroSubtitle: string
    getStartedFree: string
    signIn: string
    // Stats
    statDatesPlanned: string
    statFeltConfident: string
    statMoreSecondDates: string
    statHappyUsers: string
    // Promise Section
    promiseBadge: string
    promiseTitle1: string
    promiseTitleHighlight: string
    // Worst Case Card
    atMinimum: string
    worstCaseTitle: string
    worstCaseDesc: string
    greatConversation: string
    funExperience: string
    noRegrets: string
    // Best Case Card
    bestCaseBadge: string
    dreamOutcome: string
    bestCaseTitle: string
    bestCaseDesc: string
    realConnection: string
    foundTheOne: string
    loveStory: string
    // Our Role Card
    ourRole: string
    ourRoleTitle: string
    ourRoleDesc: string
    compatibility: string
    conversation: string
    confidence: string
    // Features Section
    featuresTitle: string
    featuresSubtitle: string
    feature1Title: string
    feature1Desc: string
    feature1Score: string
    feature1Values: string
    feature1RedFlags: string
    feature2Title: string
    feature2Desc: string
    feature2Venues: string
    feature2Outfits: string
    feature2Budget: string
    feature3Title: string
    feature3Desc: string
    feature3Icebreakers: string
    feature3DeepTalk: string
    feature3Humor: string
    // How It Works
    howItWorksTitle: string
    howItWorksSubtitle: string
    step1Title: string
    step1Desc: string
    step1Detail1: string
    step1Detail2: string
    step1Detail3: string
    step2Title: string
    step2Desc: string
    step2Detail1: string
    step2Detail2: string
    step2Detail3: string
    step3Title: string
    step3Desc: string
    step3Detail1: string
    step3Detail2: string
    step3Detail3: string
    // Testimonials
    testimonialsTitle: string
    testimonialsSubtitle: string
    // Pricing
    pricingTitle: string
    pricingSubtitle: string
    perMonth: string
    mostPopular: string
    freeTierDesc: string
    freeTierBtn: string
    freeFeature1: string
    freeFeature2: string
    freeFeature3: string
    proTierDesc: string
    proTierBtn: string
    proFeature1: string
    proFeature2: string
    proFeature3: string
    proFeature4: string
    proFeature5: string
    vipTierDesc: string
    vipTierBtn: string
    vipFeature1: string
    vipFeature2: string
    vipFeature3: string
    vipFeature4: string
    vipFeature5: string
    // Final CTA
    ctaTitle: string
    ctaSubtitle: string
    ctaSubtext: string
    ctaButton: string
    // Footer
    footerText: string
  }
  // Profile Builder
  profile: {
    title: string
    savedTitle: string
    savedSubtitle: string
    step0Title: string
    step1Title: string
    step2Title: string
    step3Title: string
    step0Desc: string
    step1Desc: string
    step2Desc: string
    step3Desc: string
    nameLabel: string
    namePlaceholder: string
    genderLabel: string
    ageLabel: string
    heightLabel: string
    bodyTypeLabel: string
    communicationStyleLabel: string
    humorStyleLabel: string
    loveLanguageLabel: string
    interestsLabel: string
    datingGoalsLabel: string
    dealBreakersLabel: string
    dealBreakersPlaceholder: string
    dealBreakersHint: string
    budgetLabel: string
    settingsLabel: string
    tipTitle: string
    tipText: string
    saveProfile: string
    // Gender options
    male: string
    female: string
    nonBinary: string
    preferNotToSay: string
    // Body type options
    slim: string
    average: string
    athletic: string
    plusSize: string
    // Communication style options
    directConfident: string
    playfulFlirty: string
    thoughtfulReserved: string
    warmConsiderate: string
    // Humor style options
    sarcasticWitty: string
    quickClever: string
    warmGoofy: string
    dryDeadpan: string
    // Love language options
    wordsOfAffirmation: string
    actsOfService: string
    qualityTime: string
    gifts: string
    // Dating goals options
    casual: string
    seriousRelationship: string
    marriage: string
    notSure: string
  }
  // New Date
  newDate: {
    title: string
    dateDetails: string
    dateDetailsDesc: string
    dateNameLabel: string
    dateNamePlaceholder: string
    platformLabel: string
    platformPlaceholder: string
    bioLabel: string
    bioPlaceholder: string
    occasionLabel: string
    dateNumberLabel: string
    locationLabel: string
    locationPlaceholder: string
    profileWarning: string
    profileWarningBtn: string
    analyzeCompatibility: string
    analyzingCompatibility: string
    checkingPlan: string
    // Occasion options
    firstDate: string
    secondDate: string
    anniversary: string
    birthday: string
    specialOccasion: string
    casualMeetup: string
    // Compatibility
    compatibilityScore: string
    greatMatch: string
    decentConnection: string
    challengingMatch: string
    alignmentAreas: string
    frictionPoints: string
    complimentSuggestions: string
    topicsToAvoid: string
    // Date Plan
    generateDatePlan: string
    generatingPlan: string
    timing: string
    outfit: string
    budget: string
    activityIdeas: string
    // Talking Points
    getTalkingPoints: string
    generatingTalkingPoints: string
    icebreakers: string
    deepConversationStarters: string
    humorSuggestions: string
    steeringCues: string
    allSetMsg: string
    saveAndGoToDashboard: string
    // Error states
    freeLimitReached: string
    freeLimitReachedDesc: string
    upgradeToPro: string
    goBack: string
    somethingWentWrong: string
    takingTooLong: string
    aiComparing: string
  }
  // Dashboard
  dashboard: {
    yourDashboard: string
    noDatesYet: string
    readyForFirstDate: string
    readyForFirstDateDesc: string
    planFirstDate: string
    totalDates: string
    completed: string
    planned: string
    datesPlural: string
    datesSingular: string
    noDatesPlanned: string
    dateNot: string
    noLocation: string
    statusCompleted: string
    statusCancelled: string
    statusPlanned: string
  }
  // Date Detail
  dateDetail: {
    dateNotFound: string
    backToDashboard: string
    compatibilityScore: string
    alignmentAreas: string
    frictionPoints: string
    topicsToAvoid: string
    complimentIdeas: string
    datePlan: string
    timing: string
    outfit: string
    budget: string
    talkingPoints: string
    postDateDebrief: string
    suggestedFollowUp: string
    noAnalysisYet: string
    noAnalysisDesc: string
    startDebrief: string
  }
  // Debrief
  debrief: {
    title: string
    dateWith: string
    howDidItGo: string
    rateExperience: string
    terrible: string
    notGreat: string
    okay: string
    prettyGood: string
    amazing: string
    whatWentWell: string
    whatWentWellPlaceholder: string
    whatWasAwkward: string
    whatWasAwkwardPlaceholder: string
    anySurprises: string
    anySurprisesPlaceholder: string
    getAiAnalysis: string
    analyzingDate: string
    debriefComplete: string
    debriefCompleteSub: string
    aiAnalysis: string
    recommendation: string
    suggestedFollowUp: string
    copyMessage: string
    copied: string
    backToDashboard: string
    planAnotherDate: string
  }
}

const en: TranslationDictionary = {
  nav: {
    home: 'Home',
    dashboard: 'Dashboard',
    newDate: 'New Date',
    loading: 'Loading...',
  },
  common: {
    back: 'Back',
    cancel: 'Cancel',
    save: 'Save',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    retry: 'Retry',
    loading: 'Loading...',
    saving: 'Saving...',
    copy: 'Copy',
    copied: 'Copied!',
    install: 'Install',
    search: 'Search',
    close: 'Close',
    error: 'Error',
    tryAgain: 'Try again',
  },
  auth: {
    backToHome: 'Back to Home',
    welcomeBack: 'Welcome Back',
    signInSubtitle: 'Sign in to continue your dating journey',
    createAccount: 'Create Account',
    signUpSubtitle: 'Join DateWise and start dating smarter',
    continueAsGuest: 'Continue as Guest',
  },
  landing: {
    heroBadge: 'AI-Powered Dating Coach',
    heroTitle1: 'Know Before',
    heroTitleHighlight: 'You Go',
    heroSubtitle: 'AI-powered dating preparation that helps you make real connections. Get compatibility insights, personalized date plans, and conversation guides — all before your date.',
    getStartedFree: 'Get Started Free',
    signIn: 'Sign In',
    statDatesPlanned: 'Dates Planned',
    statFeltConfident: 'Felt More Confident',
    statMoreSecondDates: 'More Second Dates',
    statHappyUsers: 'Happy Users',
    promiseBadge: 'The DateWise Promise',
    promiseTitle1: 'Every Date Has Two Outcomes.',
    promiseTitleHighlight: 'Both Are Wins.',
    atMinimum: 'At minimum',
    worstCaseTitle: 'A Date Worth Remembering',
    worstCaseDesc: "Even in the best-case scenario where things don't click romantically, your preparation ensures the date is enjoyable, memorable, and respectful. No awkward silences. No missed connections.",
    greatConversation: 'Great Conversation',
    funExperience: 'Fun Experience',
    noRegrets: 'No Regrets',
    bestCaseBadge: 'Best Case',
    dreamOutcome: 'The dream outcome',
    bestCaseTitle: 'They Become Your Partner',
    bestCaseDesc: "With the right preparation, genuine connection, and confidence — your date sees the real, best version of you. That's how first dates become \"how we met\" stories.",
    realConnection: 'Real Connection',
    foundTheOne: 'Found The One',
    loveStory: 'Love Story',
    ourRole: 'Our role',
    ourRoleTitle: 'Preparation & Execution',
    ourRoleDesc: "We don't guarantee love — nobody can. But we guarantee you'll walk into every date prepared, confident, and ready to put your best foot forward. The rest is up to you.",
    compatibility: 'Compatibility',
    conversation: 'Conversation',
    confidence: 'Confidence',
    featuresTitle: 'Everything you need for a great date',
    featuresSubtitle: 'Three powerful AI features working together to prepare you for meaningful connections',
    feature1Title: 'Compatibility Analysis',
    feature1Desc: 'Get deep insights into your compatibility score, alignment areas, and potential friction points before you meet.',
    feature1Score: 'Score',
    feature1Values: 'Values',
    feature1RedFlags: 'Red Flags',
    feature2Title: 'Smart Date Planner',
    feature2Desc: 'AI-generated venue suggestions, timing recommendations, outfit advice, and budget estimates tailored to your date.',
    feature2Venues: 'Venues',
    feature2Outfits: 'Outfits',
    feature2Budget: 'Budget',
    feature3Title: 'Conversation Guide',
    feature3Desc: 'Never run out of things to say. Get personalized icebreakers, deep starters, and steering cues for natural conversations.',
    feature3Icebreakers: 'Icebreakers',
    feature3DeepTalk: 'Deep Talk',
    feature3Humor: 'Humor',
    howItWorksTitle: 'How it works',
    howItWorksSubtitle: 'Three simple steps to a more confident dating life',
    step1Title: 'Build Your Profile',
    step1Desc: "Tell us about yourself — your personality, interests, dating style, and what you're looking for.",
    step1Detail1: 'Personality traits',
    step1Detail2: 'Interests & hobbies',
    step1Detail3: 'Dating goals',
    step2Title: 'Plan Your Date',
    step2Desc: "Enter your date's details and get AI-powered compatibility analysis and a personalized date plan.",
    step2Detail1: 'Compatibility score',
    step2Detail2: 'Venue & outfit',
    step2Detail3: 'Timing & budget',
    step3Title: 'Get Talking Points',
    step3Desc: 'Receive tailored conversation starters, icebreakers, and tips to keep the conversation flowing naturally.',
    step3Detail1: 'Icebreakers',
    step3Detail2: 'Deep topics',
    step3Detail3: 'Fun stories to share',
    testimonialsTitle: 'What our users say',
    testimonialsSubtitle: 'Real stories from people who dated smarter',
    pricingTitle: 'Simple, transparent pricing',
    pricingSubtitle: "Start free and upgrade when you're ready for more",
    perMonth: '/month',
    mostPopular: 'Most Popular',
    freeTierDesc: 'Perfect for getting started',
    freeTierBtn: 'Start Free',
    freeFeature1: '1 date per month',
    freeFeature2: 'Basic compatibility score',
    freeFeature3: 'Simple date plan',
    proTierDesc: 'For serious daters',
    proTierBtn: 'Get Pro',
    proFeature1: 'Unlimited dates',
    proFeature2: 'Full compatibility analysis',
    proFeature3: 'Personalized date plans',
    proFeature4: 'Conversation guides',
    proFeature5: 'Post-date debrief AI',
    vipTierDesc: 'All-access dating companion',
    vipTierBtn: 'Get VIP',
    vipFeature1: 'Everything in Pro',
    vipFeature2: 'Advanced personality matching',
    vipFeature3: 'Weekly dating strategy sessions',
    vipFeature4: 'Priority AI analysis',
    vipFeature5: 'Relationship coaching',
    ctaTitle: 'Your next date could change everything.',
    ctaSubtitle: "Walk in prepared. Walk out with a connection. At the very least, you'll have a great story to tell. At best? You'll be telling it together.",
    ctaSubtext: 'Worst case: a memorable date. Best case: a partner for life.',
    ctaButton: 'Start Your Journey',
    footerText: '© {year} DateWise AI. Making real connections, one date at a time.',
  },
  profile: {
    title: 'Build Your Profile',
    savedTitle: 'Profile Saved!',
    savedSubtitle: 'Taking you to your dashboard...',
    step0Title: 'Basic Info',
    step1Title: 'Personality',
    step2Title: 'Interests & Goals',
    step3Title: 'Date Preferences',
    step0Desc: "Let's start with the basics",
    step1Desc: 'Tell us about your personality and style',
    step2Desc: 'What interests you and what are you looking for?',
    step3Desc: 'How do you like to spend your dates?',
    nameLabel: 'Your Name *',
    namePlaceholder: 'Enter your name',
    genderLabel: 'Gender',
    ageLabel: 'Age',
    heightLabel: 'Height',
    bodyTypeLabel: 'Body Type',
    communicationStyleLabel: 'Communication Style',
    humorStyleLabel: 'Humor Style',
    loveLanguageLabel: 'Love Language',
    interestsLabel: 'Interests (select all that apply)',
    datingGoalsLabel: 'Dating Goals',
    dealBreakersLabel: 'Deal Breakers',
    dealBreakersPlaceholder: "Smoking, long distance, doesn't want kids...",
    dealBreakersHint: 'Separate with commas',
    budgetLabel: 'Budget Range',
    settingsLabel: 'Preferred Date Settings (select all that apply)',
    tipTitle: 'Tip:',
    tipText: 'You can always update your profile later. The more info you provide, the better our AI can personalize your experience!',
    saveProfile: 'Save Profile',
    male: 'Male',
    female: 'Female',
    nonBinary: 'Non-binary',
    preferNotToSay: 'Prefer not to say',
    slim: 'Slim',
    average: 'Average',
    athletic: 'Athletic',
    plusSize: 'Plus Size',
    directConfident: 'Direct & Confident',
    playfulFlirty: 'Playful & Flirty',
    thoughtfulReserved: 'Thoughtful & Reserved',
    warmConsiderate: 'Warm & Considerate',
    sarcasticWitty: 'Sarcastic & Witty',
    quickClever: 'Quick & Clever',
    warmGoofy: 'Warm & Goofy',
    dryDeadpan: 'Dry & Deadpan',
    wordsOfAffirmation: 'Words of Affirmation',
    actsOfService: 'Acts of Service',
    qualityTime: 'Quality Time',
    gifts: 'Gifts',
    casual: 'Casual Dating',
    seriousRelationship: 'Serious Relationship',
    marriage: 'Marriage',
    notSure: 'Not Sure Yet',
  },
  newDate: {
    title: 'Plan New Date',
    dateDetails: "Date's Details",
    dateDetailsDesc: 'Tell us about your upcoming date',
    dateNameLabel: "Date's Name *",
    dateNamePlaceholder: 'Who are you meeting?',
    platformLabel: 'Where did you meet?',
    platformPlaceholder: 'Tinder, Hinge, through friends...',
    bioLabel: "Date's Bio / Profile Info",
    bioPlaceholder: 'Paste their bio or describe what you know about them...',
    occasionLabel: 'Occasion',
    dateNumberLabel: 'Date Number',
    locationLabel: 'Location / City',
    locationPlaceholder: 'New York, Downtown, etc.',
    profileWarning: 'Please complete your profile first for better analysis.',
    profileWarningBtn: 'Go to Profile Builder →',
    analyzeCompatibility: 'Analyze Compatibility',
    analyzingCompatibility: 'Analyzing Compatibility...',
    checkingPlan: 'Checking plan...',
    firstDate: 'First Date',
    secondDate: 'Second Date',
    anniversary: 'Anniversary',
    birthday: 'Birthday',
    specialOccasion: 'Special Occasion',
    casualMeetup: 'Casual Meetup',
    compatibilityScore: 'Compatibility Score',
    greatMatch: 'Great match! You have strong potential.',
    decentConnection: 'Decent connection with room to grow.',
    challengingMatch: 'Challenging match — but opposites can attract!',
    alignmentAreas: 'Areas of Alignment',
    frictionPoints: 'Potential Friction Points',
    complimentSuggestions: 'Compliment Suggestions',
    topicsToAvoid: 'Topics to Avoid',
    generateDatePlan: 'Generate Date Plan',
    generatingPlan: 'Generating Plan...',
    timing: 'Timing',
    outfit: 'Outfit',
    budget: 'Budget',
    activityIdeas: 'Activity Ideas',
    getTalkingPoints: 'Get Talking Points',
    generatingTalkingPoints: 'Generating Talking Points...',
    icebreakers: 'Icebreakers',
    deepConversationStarters: 'Deep Conversation Starters',
    humorSuggestions: 'Humor Suggestions',
    steeringCues: 'Conversation Steering Cues',
    allSetMsg: "You're all set! Save this date and review your plan before heading out.",
    saveAndGoToDashboard: 'Save & Go to Dashboard',
    freeLimitReached: 'Free Limit Reached',
    freeLimitReachedDesc: "You've used your free date this month. Upgrade to Pro for unlimited dates and full features!",
    upgradeToPro: 'Upgrade to Pro',
    goBack: 'Go Back',
    somethingWentWrong: 'Oops! Something went wrong',
    takingTooLong: 'Taking too long?',
    aiComparing: 'Our AI is comparing your profiles',
  },
  dashboard: {
    yourDashboard: 'Your Dashboard',
    noDatesYet: "No dates planned yet. Let's change that!",
    readyForFirstDate: 'Ready for your first date?',
    readyForFirstDateDesc: 'Add your upcoming date details and let our AI help you prepare for a great time together.',
    planFirstDate: 'Plan Your First Date',
    totalDates: 'Total Dates',
    completed: 'Completed',
    planned: 'Planned',
    datesPlural: 'dates planned',
    datesSingular: 'date planned',
    noDatesPlanned: "No dates planned yet. Let's change that!",
    dateNot: 'date',
    noLocation: 'No location',
    statusCompleted: 'Completed',
    statusCancelled: 'Cancelled',
    statusPlanned: 'Planned',
  },
  dateDetail: {
    dateNotFound: 'Date not found',
    backToDashboard: 'Back to Dashboard',
    compatibilityScore: 'Compatibility Score',
    alignmentAreas: 'Alignment Areas',
    frictionPoints: 'Friction Points',
    topicsToAvoid: 'Topics to Avoid',
    complimentIdeas: 'Compliment Ideas',
    datePlan: 'Date Plan',
    timing: 'Timing',
    outfit: 'Outfit',
    budget: 'Budget',
    talkingPoints: 'Talking Points',
    postDateDebrief: 'Post-Date Debrief',
    suggestedFollowUp: 'Suggested Follow-up Message:',
    noAnalysisYet: 'No analysis yet',
    noAnalysisDesc: 'Go to "Plan New Date" to generate compatibility insights for this date.',
    startDebrief: 'Start Post-Date Debrief',
  },
  debrief: {
    title: 'Post-Date Debrief',
    dateWith: 'Date with',
    howDidItGo: 'How did the date go?',
    rateExperience: 'Rate your overall experience',
    terrible: 'Terrible',
    notGreat: 'Not great',
    okay: 'It was okay',
    prettyGood: 'Pretty good!',
    amazing: 'Amazing!',
    whatWentWell: 'What went well?',
    whatWentWellPlaceholder: 'Great conversation, good chemistry, loved the venue...',
    whatWasAwkward: 'What was awkward?',
    whatWasAwkwardPlaceholder: 'Awkward silences, weird topics, uncomfortable moments...',
    anySurprises: 'Any surprises?',
    anySurprisesPlaceholder: 'Unexpected topics, surprising things you learned...',
    getAiAnalysis: 'Get AI Analysis',
    analyzingDate: 'Analyzing Your Date...',
    debriefComplete: 'Debrief Complete!',
    debriefCompleteSub: "Here's what our dating coach thinks.",
    aiAnalysis: 'AI Analysis',
    recommendation: 'Recommendation',
    suggestedFollowUp: 'Suggested Follow-up Message',
    copyMessage: 'Copy Message',
    copied: 'Copied!',
    backToDashboard: 'Back to Dashboard',
    planAnotherDate: 'Plan Another Date',
  },
}

// Helper to create a partial dictionary with overrides
type PartialDict = { [K in keyof TranslationDictionary]?: { [K2 in keyof TranslationDictionary[K]]?: string } }

function mergeWithBase(base: TranslationDictionary, overrides: PartialDict): TranslationDictionary {
  const result = { ...base }
  for (const key in overrides) {
    const sectionKey = key as keyof TranslationDictionary
    if (overrides[sectionKey]) {
      result[sectionKey] = { ...result[sectionKey], ...overrides[sectionKey] } as any
    }
  }
  return result
}

// Spanish translations
const es: TranslationDictionary = mergeWithBase(en, {
  nav: { home: 'Inicio', dashboard: 'Panel', newDate: 'Nueva Cita', loading: 'Cargando...' },
  common: { back: 'Volver', cancel: 'Cancelar', save: 'Guardar', next: 'Siguiente', previous: 'Anterior', submit: 'Enviar', retry: 'Reintentar', loading: 'Cargando...', saving: 'Guardando...', copy: 'Copiar', copied: '¡Copiado!', tryAgain: 'Intentar de nuevo' },
  auth: { backToHome: 'Volver al Inicio', welcomeBack: 'Bienvenido de nuevo', signInSubtitle: 'Inicia sesión para continuar tu viaje de citas', createAccount: 'Crear Cuenta', signUpSubtitle: 'Únete a DateWise y empieza a salir más inteligente' },
  landing: {
    heroBadge: 'Coach de Citas con IA', heroTitle1: 'Conoce Antes de', heroTitleHighlight: 'Salir',
    heroSubtitle: 'Preparación para citas impulsada por IA que te ayuda a hacer conexiones reales. Obtén información de compatibilidad, planes de citas personalizados y guías de conversación, todo antes de tu cita.',
    getStartedFree: 'Empieza Gratis', signIn: 'Iniciar Sesión',
    statDatesPlanned: 'Citas Planificadas', statFeltConfident: 'Se Sintieron Más Seguros', statMoreSecondDates: 'Más Segundas Citas', statHappyUsers: 'Usuarios Felices',
    promiseBadge: 'La Promesa de DateWise', promiseTitle1: 'Toda Cita Tiene Dos Resultados.', promiseTitleHighlight: 'Ambos Son Victorias.',
    atMinimum: 'Como mínimo', worstCaseTitle: 'Una Cita que Vale la Pena Recordar',
    worstCaseDesc: "Incluso en el mejor de los casos donde no hay química romántica, tu preparación asegura que la cita sea agradable, memorable y respetuosa. Sin silencios incómodos. Sin conexiones perdidas.",
    greatConversation: 'Gran Conversación', funExperience: 'Experiencia Divertida', noRegrets: 'Sin Arrepentimientos',
    bestCaseBadge: 'Mejor Caso', dreamOutcome: 'El resultado soñado', bestCaseTitle: 'Se Convierte en Tu Pareja',
    bestCaseDesc: 'Con la preparación adecuada, conexión genuina y confianza — tu cita ve la mejor versión real de ti. Así es como las primeras citas se convierten en historias de "cómo nos conocimos".',
    realConnection: 'Conexión Real', foundTheOne: 'Encontraste al Alguien', loveStory: 'Historia de Amor',
    ourRole: 'Nuestro rol', ourRoleTitle: 'Preparación y Ejecución',
    ourRoleDesc: "No garantizamos el amor — nadie puede. Pero garantizamos que entrarás a cada cita preparado, seguro y listo para dar lo mejor de ti. El resto depende de ti.",
    compatibility: 'Compatibilidad', conversation: 'Conversación', confidence: 'Confianza',
    featuresTitle: 'Todo lo que necesitas para una gran cita', featuresSubtitle: 'Tres potentes funciones de IA trabajando juntas para prepararte para conexiones significativas',
    feature1Title: 'Análisis de Compatibilidad', feature1Desc: 'Obtén información profunda sobre tu puntuación de compatibilidad, áreas de alineación y posibles puntos de fricción antes de conocerse.',
    feature1Score: 'Puntuación', feature1Values: 'Valores', feature1RedFlags: 'Banderas Rojas',
    feature2Title: 'Planificador Inteligente de Citas', feature2Desc: 'Sugerencias de lugares, recomendaciones de horario, consejos de atuendo y estimaciones de presupuesto generadas por IA adaptadas a tu cita.',
    feature2Venues: 'Lugares', feature2Outfits: 'Atuendos', feature2Budget: 'Presupuesto',
    feature3Title: 'Guía de Conversación', feature3Desc: 'Nunca te quedes sin temas. Obtén rompehielos, inicios profundos y señales de dirección para conversaciones naturales.',
    feature3Icebreakers: 'Rompehielos', feature3DeepTalk: 'Conversación Profunda', feature3Humor: 'Humor',
    howItWorksTitle: 'Cómo funciona', howItWorksSubtitle: 'Tres simples pasos para una vida amorosa más segura',
    step1Title: 'Crea Tu Perfil', step1Desc: 'Cuéntanos sobre ti — tu personalidad, intereses, estilo de citas y lo que buscas.',
    step1Detail1: 'Rasgos de personalidad', step1Detail2: 'Intereses y pasatiempos', step1Detail3: 'Objetivos amorosos',
    step2Title: 'Planifica Tu Cita', step2Desc: 'Ingresa los datos de tu cita y obtén un análisis de compatibilidad con IA y un plan de cita personalizado.',
    step2Detail1: 'Puntuación de compatibilidad', step2Detail2: 'Lugar y atuendo', step2Detail3: 'Horario y presupuesto',
    step3Title: 'Obtén Puntos de Conversación', step3Desc: 'Recibe inicios de conversación, rompehielos y consejos para mantener la conversación fluyendo naturalmente.',
    step3Detail1: 'Rompehielos', step3Detail2: 'Temas profundos', step3Detail3: 'Historias divertidas',
    testimonialsTitle: 'Lo que dicen nuestros usuarios', testimonialsSubtitle: 'Historias reales de personas que salieron más inteligente',
    pricingTitle: 'Precios simples y transparentes', pricingSubtitle: 'Empieza gratis y mejora cuando estés listo para más',
    perMonth: '/mes', mostPopular: 'Más Popular',
    freeTierDesc: 'Perfecto para comenzar', freeTierBtn: 'Empezar Gratis',
    freeFeature1: '1 cita al mes', freeFeature2: 'Puntuación básica de compatibilidad', freeFeature3: 'Plan de cita simple',
    proTierDesc: 'Para citas serias', proTierBtn: 'Obtener Pro',
    proFeature1: 'Citas ilimitadas', proFeature2: 'Análisis completo de compatibilidad', proFeature3: 'Planes de cita personalizados', proFeature4: 'Guías de conversación', proFeature5: 'Debrief post-cita con IA',
    vipTierDesc: 'Compañero de citas con acceso total', vipTierBtn: 'Obtener VIP',
    vipFeature1: 'Todo en Pro', vipFeature2: 'Emparejamiento avanzado de personalidad', vipFeature3: 'Sesiones semanales de estrategia', vipFeature4: 'Análisis IA prioritario', vipFeature5: 'Coaching de relaciones',
    ctaTitle: 'Tu próxima cita podría cambiar todo.', ctaSubtitle: 'Entra preparado. Sal con una conexión. Como mínimo, tendrás una gran historia que contar. ¿En el mejor caso? La contarán juntos.',
    ctaSubtext: 'En el peor caso: una cita memorable. En el mejor: una pareja para toda la vida.',
    ctaButton: 'Comienza Tu Viaje',
    footerText: '© {year} DateWise AI. Creando conexiones reales, una cita a la vez.',
  },
  profile: {
    title: 'Crea Tu Perfil', savedTitle: '¡Perfil Guardado!', savedSubtitle: 'Llevándote a tu panel...',
    step0Title: 'Info Básica', step1Title: 'Personalidad', step2Title: 'Intereses y Metas', step3Title: 'Preferencias de Cita',
    step0Desc: 'Empecemos con lo básico', step1Desc: 'Cuéntanos sobre tu personalidad y estilo', step2Desc: '¿Qué te interesa y qué buscas?', step3Desc: '¿Cómo te gusta pasar tus citas?',
    nameLabel: 'Tu Nombre *', namePlaceholder: 'Ingresa tu nombre',
    genderLabel: 'Género', ageLabel: 'Edad', heightLabel: 'Altura',
    bodyTypeLabel: 'Tipo de Cuerpo', communicationStyleLabel: 'Estilo de Comunicación', humorStyleLabel: 'Estilo de Humor', loveLanguageLabel: 'Lenguaje del Amor',
    interestsLabel: 'Intereses (selecciona todos los que apliquen)', datingGoalsLabel: 'Objetivos de Citas',
    dealBreakersLabel: 'Líneas Inviolables', dealBreakersPlaceholder: 'Fumar, distancia, no quiere hijos...', dealBreakersHint: 'Separa con comas',
    budgetLabel: 'Rango de Presupuesto', settingsLabel: 'Escenarios Preferidos de Cita',
    tipTitle: 'Consejo:', tipText: '¡Siempre puedes actualizar tu perfil más tarde! Cuanta más información proporciones, mejor nuestra IA puede personalizar tu experiencia.',
    saveProfile: 'Guardar Perfil',
    male: 'Masculino', female: 'Femenino', nonBinary: 'No binario', preferNotToSay: 'Prefiero no decir',
    slim: 'Delgado', average: 'Promedio', athletic: 'Atlético', plusSize: 'Talla Grande',
    directConfident: 'Directo y Seguro', playfulFlirty: 'Juguetón y Coqueto', thoughtfulReserved: 'Reflexivo y Reservado', warmConsiderate: 'Cálido y Considerado',
    sarcasticWitty: 'Sarcástico e Ingenioso', quickClever: 'Rápido e Ingenioso', warmGoofy: 'Cálido y Tonto', dryDeadpan: 'Seco y Acatado',
    wordsOfAffirmation: 'Palabras de Afirmación', actsOfService: 'Actos de Servicio', qualityTime: 'Tiempo de Calidad', gifts: 'Regalos',
    casual: 'Citas Casuales', seriousRelationship: 'Relación Seria', marriage: 'Matrimonio', notSure: 'No Estoy Seguro',
  },
  newDate: {
    title: 'Planificar Nueva Cita', dateDetails: 'Datos de la Cita', dateDetailsDesc: 'Cuéntanos sobre tu próxima cita',
    dateNameLabel: 'Nombre de la Cita *', dateNamePlaceholder: '¿Con quién te vas a encontrar?',
    platformLabel: '¿Dónde se conocieron?', platformPlaceholder: 'Tinder, Hinge, por amigos...',
    bioLabel: 'Biografía / Perfil de la Cita', bioPlaceholder: 'Pega su biografía o describe lo que sabes...',
    occasionLabel: 'Ocasión', dateNumberLabel: 'Número de Cita',
    locationLabel: 'Ubicación / Ciudad', locationPlaceholder: 'Ciudad de México, Centro, etc.',
    profileWarning: 'Por favor completa tu perfil primero para un mejor análisis.', profileWarningBtn: 'Ir al Creador de Perfil →',
    analyzeCompatibility: 'Analizar Compatibilidad', analyzingCompatibility: 'Analizando Compatibilidad...', checkingPlan: 'Verificando plan...',
    firstDate: 'Primera Cita', secondDate: 'Segunda Cita', anniversary: 'Aniversario', birthday: 'Cumpleaños', specialOccasion: 'Ocasión Especial', casualMeetup: 'Encuentro Casual',
    compatibilityScore: 'Puntuación de Compatibilidad', greatMatch: '¡Gran coincidencia! Tienes gran potencial.', decentConnection: 'Conexión decente con espacio para crecer.', challengingMatch: 'Desafío — ¡pero los opuestos se atraen!',
    alignmentAreas: 'Áreas de Alineación', frictionPoints: 'Puntos Potenciales de Fricción', complimentSuggestions: 'Sugerencias de Cumplidos', topicsToAvoid: 'Temas a Evitar',
    generateDatePlan: 'Generar Plan de Cita', generatingPlan: 'Generando Plan...',
    timing: 'Horario', outfit: 'Atuendo', budget: 'Presupuesto', activityIdeas: 'Ideas de Actividades',
    getTalkingPoints: 'Obtener Puntos de Conversación', generatingTalkingPoints: 'Generando Puntos de Conversación...',
    icebreakers: 'Rompehielos', deepConversationStarters: 'Inicios de Conversación Profunda', humorSuggestions: 'Sugerencias de Humor', steeringCues: 'Señales de Dirección',
    allSetMsg: '¡Todo listo! Guarda esta cita y revisa tu plan antes de salir.',
    saveAndGoToDashboard: 'Guardar e Ir al Panel',
    freeLimitReached: 'Límite Gratuito Alcanzado', freeLimitReachedDesc: '¡Has usado tu cita gratuita este mes! ¡Mejora a Pro para citas ilimitadas!',
    upgradeToPro: 'Mejorar a Pro', goBack: 'Volver', somethingWentWrong: '¡Ups! Algo salió mal', takingTooLong: '¿Tardando mucho?', aiComparing: 'Nuestra IA está comparando sus perfiles',
  },
  dashboard: {
    yourDashboard: 'Tu Panel', noDatesYet: "Aún no hay citas planificadas. ¡Cambiemos eso!",
    readyForFirstDate: '¿Listo para tu primera cita?', readyForFirstDateDesc: 'Agrega los datos de tu próxima cita y deja que nuestra IA te ayude a prepararte.',
    planFirstDate: 'Planifica Tu Primera Cita', totalDates: 'Total de Citas', completed: 'Completadas', planned: 'Planificadas',
    datesPlural: 'citas planificadas', datesSingular: 'cita planificada', noDatesPlanned: "Aún no hay citas planificadas.",
    dateNot: 'cita', noLocation: 'Sin ubicación', statusCompleted: 'Completada', statusCancelled: 'Cancelada', statusPlanned: 'Planificada',
  },
  dateDetail: {
    dateNotFound: 'Cita no encontrada', backToDashboard: 'Volver al Panel', compatibilityScore: 'Puntuación de Compatibilidad',
    alignmentAreas: 'Áreas de Alineación', frictionPoints: 'Puntos de Fricción', topicsToAvoid: 'Temas a Evitar', complimentIdeas: 'Ideas de Cumplidos',
    datePlan: 'Plan de Cita', timing: 'Horario', outfit: 'Atuendo', budget: 'Presupuesto', talkingPoints: 'Puntos de Conversación',
    postDateDebrief: 'Debrief Post-Cita', suggestedFollowUp: 'Mensaje de Seguimiento Sugerido:',
    noAnalysisYet: 'Sin análisis aún', noAnalysisDesc: 'Ve a "Planificar Nueva Cita" para generar información de compatibilidad.',
    startDebrief: 'Iniciar Debrief Post-Cita',
  },
  debrief: {
    title: 'Debrief Post-Cita', dateWith: 'Cita con', howDidItGo: '¿Cómo fue la cita?', rateExperience: 'Califica tu experiencia general',
    terrible: 'Terrible', notGreat: 'No tan bien', okay: 'Estuvo bien', prettyGood: '¡Bastante bien!', amazing: '¡Increíble!',
    whatWentWell: '¿Qué salió bien?', whatWentWellPlaceholder: 'Gran conversación, buena química, me encantó el lugar...',
    whatWasAwkward: '¿Qué fue incómodo?', whatWasAwkwardPlaceholder: 'Silencios incómodos, temas raros, momentos incomodos...',
    anySurprises: '¿Alguna sorpresa?', anySurprisesPlaceholder: 'Temas inesperados, cosas sorprendentes que aprendiste...',
    getAiAnalysis: 'Obtener Análisis IA', analyzingDate: 'Analizando Tu Cita...',
    debriefComplete: '¡Debrief Completo!', debriefCompleteSub: 'Esto es lo que piensa nuestro coach de citas.',
    aiAnalysis: 'Análisis IA', recommendation: 'Recomendación', suggestedFollowUp: 'Mensaje de Seguimiento Sugerido',
    copyMessage: 'Copiar Mensaje', copied: '¡Copiado!', backToDashboard: 'Volver al Panel', planAnotherDate: 'Planificar Otra Cita',
  },
})

// German translations
const de: TranslationDictionary = mergeWithBase(en, {
  nav: { home: 'Start', dashboard: 'Dashboard', newDate: 'Neues Date', loading: 'Laden...' },
  common: { back: 'Zurück', cancel: 'Abbrechen', save: 'Speichern', next: 'Weiter', previous: 'Zurück', submit: 'Senden', retry: 'Erneut versuchen', loading: 'Laden...', saving: 'Speichern...', copy: 'Kopieren', copied: 'Kopiert!', tryAgain: 'Erneut versuchen' },
  auth: { backToHome: 'Zurück zum Start', welcomeBack: 'Willkommen zurück', signInSubtitle: 'Melde dich an, um deine Dating-Reise fortzusetzen', createAccount: 'Konto erstellen', signUpSubtitle: 'Trete DateWise bei und date klüger' },
  landing: {
    heroBadge: 'KI-Dating-Coach', heroTitle1: 'Wisse bevor', heroTitleHighlight: 'Du gehst',
    heroSubtitle: 'KI-gestützte Dating-Vorbereitung, die dir hilft, echte Verbindungen aufzubauen. Erhalte Kompatibilitätseinblicke, personalisierte Date-Pläne und Gesprächsanleitungen — alles vor deinem Date.',
    getStartedFree: 'Kostenlos starten', signIn: 'Anmelden',
    statDatesPlanned: 'Dates geplant', statFeltConfident: 'Fühlten sich sicherer', statMoreSecondDates: 'Mehr Zweitdates', statHappyUsers: 'Zufriedene Nutzer',
    promiseBadge: 'Das DateWise Versprechen', promiseTitle1: 'Jedes Date hat zwei Ausgänge.', promiseTitleHighlight: 'Beide sind Gewinne.',
    atMinimum: 'Mindestens', worstCaseTitle: 'Ein Date zum Erinnern',
    worstCaseDesc: "Selbst wenn romantisch nichts funkt, sorgt deine Vorbereitung dafür, dass das Date angenehm, unvergesslich und respektvoll ist. Keine peinlichen Pausen. Keine verpassten Verbindungen.",
    greatConversation: 'Tolles Gespräch', funExperience: 'Spaßiges Erlebnis', noRegrets: 'Keine Reue',
    bestCaseBadge: 'Bestes Szenario', dreamOutcome: 'Der Traum', bestCaseTitle: 'Er/sie wird dein Partner',
    bestCaseDesc: 'Mit der richtigen Vorbereitung, echten Verbindung und Selbstvertrauen — sieht dein Date die echte, beste Version von dir. So werden Erstdates zu „Wie wir uns kennengelernt haben"-Geschichten.',
    realConnection: 'Echte Verbindung', foundTheOne: 'Den Richtigen gefunden', loveStory: 'Liebesgeschichte',
    ourRole: 'Unsere Rolle', ourRoleTitle: 'Vorbereitung & Umsetzung',
    ourRoleDesc: "Wir garantieren keine Liebe — niemand kann das. Aber wir garantieren, dass du jedes Date vorbereitet, selbstbewusst und bereit gehst. Der Rest liegt bei dir.",
    compatibility: 'Kompatibilität', conversation: 'Gespräch', confidence: 'Selbstvertrauen',
    featuresTitle: 'Alles für ein tolles Date', featuresSubtitle: 'Drei leistungsstarke KI-Funktionen für bedeutsame Verbindungen',
    feature1Title: 'Kompatibilitätsanalyse', feature1Desc: 'Erhalte tiefe Einblicke in deine Kompatibilitätspunkte, Übereinstimmungen und mögliche Reibungspunkte vor dem Treffen.',
    feature1Score: 'Punkte', feature1Values: 'Werte', feature1RedFlags: 'Red Flags',
    feature2Title: 'Intelligenter Date-Planer', feature2Desc: 'KI-generierte Location-Vorschläge, Timing-Empfehlungen, Outfit-Tipps und Budget-Schätzungen für dein Date.',
    feature2Venues: 'Locations', feature2Outfits: 'Outfits', feature2Budget: 'Budget',
    feature3Title: 'Gesprächsführer', feature3Desc: 'Gerade keine Themen mehr. Erhalte personalisierte Eisbrecher, tiefgründige Einstiege und Lenkungshinweise für natürliche Gespräche.',
    feature3Icebreakers: 'Eisbrecher', feature3DeepTalk: 'Tiefgründiges', feature3Humor: 'Humor',
    howItWorksTitle: 'So funktioniert\'s', howItWorksSubtitle: 'Drei einfache Schritte zu mehr Selbstvertrauen beim Dating',
    step1Title: 'Erstelle Dein Profil', step1Desc: 'Erzähl uns über dich — deine Persönlichkeit, Interessen, Dating-Stil und was du suchst.',
    step1Detail1: 'Persönlichkeitsmerkmale', step1Detail2: 'Interessen & Hobbys', step1Detail3: 'Dating-Ziele',
    step2Title: 'Plane Dein Date', step2Desc: 'Gib die Daten deines Dates ein und erhalte eine KI-Kompatibilitätsanalyse und einen personalisierten Date-Plan.',
    step2Detail1: 'Kompatibilitätspunkte', step2Detail2: 'Location & Outfit', step2Detail3: 'Timing & Budget',
    step3Title: 'Erhalte Gesprächspunkte', step3Desc: 'Erhalte maßgeschneiderte Gesprächseinstiege, Eisbrecher und Tipps für natürliche Gespräche.',
    step3Detail1: 'Eisbrecher', step3Detail2: 'Tiefe Themen', step3Detail3: 'Lustige Geschichten',
    testimonialsTitle: 'Was unsere Nutzer sagen', testimonialsSubtitle: 'Echte Geschichten von Menschen, die klüger dateten',
    pricingTitle: 'Einfache, transparente Preise', pricingSubtitle: 'Starte kostenlos und upgrades wenn du bereit bist',
    perMonth: '/Monat', mostPopular: 'Beliebteste',
    freeTierDesc: 'Perfekt zum Starten', freeTierBtn: 'Kostenlos starten',
    freeFeature1: '1 Date pro Monat', freeFeature2: 'Basis-Kompatibilitätspunkte', freeFeature3: 'Einfacher Date-Plan',
    proTierDesc: 'Für ernsthafte Dater', proTierBtn: 'Pro holen',
    proFeature1: 'Unbegrenzte Dates', proFeature2: 'Volle Kompatibilitätsanalyse', proFeature3: 'Personalisierte Date-Pläne', proFeature4: 'Gesprächsanleitungen', proFeature5: 'Post-Date Debrief KI',
    vipTierDesc: 'Premium Dating-Begleiter', vipTierBtn: 'VIP holen',
    vipFeature1: 'Alles in Pro', vipFeature2: 'Erweiterte Persönlichkeitsanalyse', vipFeature3: 'Wöchentliche Dating-Strategie-Sitzungen', vipFeature4: 'Prioritäts KI-Analyse', vipFeature5: 'Beziehungs-Coaching',
    ctaTitle: 'Dein nächstes Date könnte alles verändern.', ctaSubtitle: 'Geh vorbereitet hin. Komm mit einer Verbindung zurück. Mindestens hast du eine tolle Geschichte zu erzählen. Im besten Fall? Ihr erzählt sie zusammen.',
    ctaSubtext: 'Schlimmstenfalls: ein unvergessliches Date. Bestenfalls: ein Partner fürs Leben.',
    ctaButton: 'Starte Deine Reise',
    footerText: '© {year} DateWise AI. Echte Verbindungen, ein Date nach dem anderen.',
  },
  profile: {
    title: 'Erstelle Dein Profil', savedTitle: 'Profil gespeichert!', savedSubtitle: 'Du wirst zum Dashboard weitergeleitet...',
    step0Title: 'Basisinfo', step1Title: 'Persönlichkeit', step2Title: 'Interessen & Ziele', step3Title: 'Date-Vorlieben',
    step0Desc: 'Fangen wir mit den Basics an', step1Desc: 'Erzähl uns über deine Persönlichkeit und Stil', step2Desc: 'Was interessiert dich und was suchst du?', step3Desc: 'Wie verbringst du am liebsten deine Dates?',
    nameLabel: 'Dein Name *', namePlaceholder: 'Gib deinen Namen ein',
    genderLabel: 'Geschlecht', ageLabel: 'Alter', heightLabel: 'Größe',
    bodyTypeLabel: 'Körpertyp', communicationStyleLabel: 'Kommunikationsstil', humorStyleLabel: 'Humor-Stil', loveLanguageLabel: 'Sprache der Liebe',
    interestsLabel: 'Interessen (wähle alle zutreffenden)', datingGoalsLabel: 'Dating-Ziele',
    dealBreakersLabel: 'Deal-Breaker', dealBreakersPlaceholder: 'Rauchen, Fernbeziehung, möchte keine Kinder...', dealBreakersHint: 'Mit Kommas trennen',
    budgetLabel: 'Budget-Bereich', settingsLabel: 'Bevorzugte Date-Umgebungen',
    tipTitle: 'Tipp:', tipText: 'Du kannst dein Profil jederzeit aktualisieren. Je mehr Infos du gibst, desto besser kann unsere KI dein Erlebnis personalisieren!',
    saveProfile: 'Profil speichern',
    male: 'Männlich', female: 'Weiblich', nonBinary: 'Nicht-binär', preferNotToSay: 'Keine Angabe',
    slim: 'Schlank', average: 'Durchschnitt', athletic: 'Sportlich', plusSize: 'Kurvig',
    directConfident: 'Direkt & Selbstbewusst', playfulFlirty: 'Spielerisch & Flirty', thoughtfulReserved: 'Nachdenklich & Zurückhaltend', warmConsiderate: 'Warm & Rücksichtsvoll',
    sarcasticWitty: 'Sarkastisch & Witzig', quickClever: 'Schnell & Clever', warmGoofy: 'Warm & Albern', dryDeadpan: 'Trocken & Kumpelhaft',
    wordsOfAffirmation: 'Worte der Anerkennung', actsOfService: 'Taten der Liebe', qualityTime: 'Qualitätszeit', gifts: 'Geschenke',
    casual: 'Casual Dating', seriousRelationship: 'Feste Beziehung', marriage: 'Heirat', notSure: 'Noch nicht sicher',
  },
  newDate: {
    title: 'Neues Date planen', dateDetails: 'Date-Details', dateDetailsDesc: 'Erzähl uns von deinem kommenden Date',
    dateNameLabel: 'Name des Dates *', dateNamePlaceholder: 'Mit wem triffst du dich?',
    platformLabel: 'Wo habt ihr euch kennengelernt?', platformPlaceholder: 'Tinder, Hinge, durch Freunde...',
    bioLabel: 'Bio / Profil-Info des Dates', bioPlaceholder: 'Füge die Bio ein oder beschreibe, was du weißt...',
    occasionLabel: 'Anlass', dateNumberLabel: 'Date-Nummer',
    locationLabel: 'Ort / Stadt', locationPlaceholder: 'Berlin, Innenstadt, etc.',
    profileWarning: 'Bitte vervollständige zuerst dein Profil für eine bessere Analyse.', profileWarningBtn: 'Zum Profil-Builder →',
    analyzeCompatibility: 'Kompatibilität analysieren', analyzingCompatibility: 'Kompatibilität wird analysiert...', checkingPlan: 'Plane wird geprüft...',
    firstDate: 'Erstes Date', secondDate: 'Zweites Date', anniversary: 'Jubiläum', birthday: 'Geburtstag', specialOccasion: 'Besonderer Anlass', casualMeetup: 'Casuales Treffen',
    compatibilityScore: 'Kompatibilitätspunkte', greatMatch: 'Große Übereinstimmung! Ihr habt starkes Potenzial.', decentConnection: 'Solide Verbindung mit Wachstumspotenzial.', challengingMatch: 'Herausforderung — aber Gegensätze ziehen sich an!',
    alignmentAreas: 'Übereinstimmungen', frictionPoints: 'Mögliche Reibungspunkte', complimentSuggestions: 'Kompliment-Vorschläge', topicsToAvoid: 'Themen vermeiden',
    generateDatePlan: 'Date-Plan erstellen', generatingPlan: 'Plan wird erstellt...',
    timing: 'Timing', outfit: 'Outfit', budget: 'Budget', activityIdeas: 'Aktivitätsideen',
    getTalkingPoints: 'Gesprächspunkte erhalten', generatingTalkingPoints: 'Gesprächspunkte werden erstellt...',
    icebreakers: 'Eisbrecher', deepConversationStarters: 'Tiefgründige Gesprächseinstiege', humorSuggestions: 'Humor-Vorschläge', steeringCues: 'Gesprächslenkung',
    allSetMsg: 'Alles fertig! Speichere dieses Date und prüfe deinen Plan vor dem Losgehen.',
    saveAndGoToDashboard: 'Speichern & zum Dashboard',
    freeLimitReached: 'Kostenlimit erreicht', freeLimitReachedDesc: 'Du hast dein kostenloses Date diesen Monat genutzt! Upgrade zu Pro für unbegrenzte Dates!',
    upgradeToPro: 'Auf Pro upgraden', goBack: 'Zurück', somethingWentWrong: 'Ups! Etwas ist schiefgelaufen', takingTooLong: 'Dauert zu lange?', aiComparing: 'Unsere KI vergleicht eure Profile',
  },
  dashboard: {
    yourDashboard: 'Dein Dashboard', noDatesYet: 'Noch keine Dates geplant. Lass uns das ändern!',
    readyForFirstDate: 'Bereit für dein erstes Date?', readyForFirstDateDesc: 'Füge die Daten deines kommenden Dates hinzu und lass unsere KI dir helfen.',
    planFirstDate: 'Plane dein erstes Date', totalDates: 'Gesamt', completed: 'Abgeschlossen', planned: 'Geplant',
    datesPlural: 'Dates geplant', datesSingular: 'Date geplant', noDatesPlanned: 'Noch keine Dates geplant.',
    dateNot: 'Date', noLocation: 'Kein Ort', statusCompleted: 'Abgeschlossen', statusCancelled: 'Abgesagt', statusPlanned: 'Geplant',
  },
  dateDetail: {
    dateNotFound: 'Date nicht gefunden', backToDashboard: 'Zum Dashboard', compatibilityScore: 'Kompatibilitätspunkte',
    alignmentAreas: 'Übereinstimmungen', frictionPoints: 'Reibungspunkte', topicsToAvoid: 'Themen vermeiden', complimentIdeas: 'Kompliment-Ideen',
    datePlan: 'Date-Plan', timing: 'Timing', outfit: 'Outfit', budget: 'Budget', talkingPoints: 'Gesprächspunkte',
    postDateDebrief: 'Post-Date Debrief', suggestedFollowUp: 'Vorgeschlagene Follow-up-Nachricht:',
    noAnalysisYet: 'Noch keine Analyse', noAnalysisDesc: 'Gehe zu "Neues Date planen" um Kompatibilitätseinblicke zu erhalten.',
    startDebrief: 'Post-Date Debrief starten',
  },
  debrief: {
    title: 'Post-Date Debrief', dateWith: 'Date mit', howDidItGo: 'Wie war das Date?', rateExperience: 'Bewerte dein Gesamterlebnis',
    terrible: 'Schrecklich', notGreat: 'Nicht so gut', okay: 'Es war okay', prettyGood: 'Ziemlich gut!', amazing: 'Fantastisch!',
    whatWentWell: 'Was lief gut?', whatWentWellPlaceholder: 'Tolles Gespräch, gute Chemie, toller Ort...',
    whatWasAwkward: 'Was war unangenehm?', whatWasAwkwardPlaceholder: 'Unangenehme Pausen, seltsame Themen...',
    anySurprises: 'Überraschungen?', anySurprisesPlaceholder: 'Unerwartete Themen, überraschende Entdeckungen...',
    getAiAnalysis: 'KI-Analyse erhalten', analyzingDate: 'Dein Date wird analysiert...',
    debriefComplete: 'Debrief abgeschlossen!', debriefCompleteSub: 'Das denkt unser Dating-Coach.',
    aiAnalysis: 'KI-Analyse', recommendation: 'Empfehlung', suggestedFollowUp: 'Vorgeschlagene Follow-up-Nachricht',
    copyMessage: 'Nachricht kopieren', copied: 'Kopiert!', backToDashboard: 'Zum Dashboard', planAnotherDate: 'Anderes Date planen',
  },
})

// French translations
const fr: TranslationDictionary = mergeWithBase(en, {
  nav: { home: 'Accueil', dashboard: 'Tableau de bord', newDate: 'Nouveau Rendez-vous', loading: 'Chargement...' },
  common: { back: 'Retour', cancel: 'Annuler', save: 'Enregistrer', next: 'Suivant', previous: 'Précédent', submit: 'Envoyer', retry: 'Réessayer', loading: 'Chargement...', saving: 'Enregistrement...', copy: 'Copier', copied: 'Copié !', tryAgain: 'Réessayer' },
  auth: { backToHome: "Retour à l'accueil", welcomeBack: 'Bon retour parmi nous', signInSubtitle: 'Connectez-vous pour continuer votre parcours', createAccount: 'Créer un compte', signUpSubtitle: 'Rejoignez DateWise et soyez plus malin en dating' },
  landing: {
    heroBadge: 'Coach Dating IA', heroTitle1: 'Sachez Avant', heroTitleHighlight: 'D\'Y Aller',
    heroSubtitle: "Préparation au dating propulsée par l'IA qui vous aide à créer des connexions réelles. Obtenez des analyses de compatibilité, des plans de rendez-vous personnalisés et des guides de conversation — le tout avant votre date.",
    getStartedFree: 'Commencer gratuitement', signIn: 'Se connecter',
    statDatesPlanned: 'Dates planifiées', statFeltConfident: 'Se sont sentis plus confiants', statMoreSecondDates: 'Plus de deuxièmes dates', statHappyUsers: 'Utilisateurs heureux',
    promiseBadge: 'La Promesse DateWise', promiseTitle1: 'Chaque Date a Deux Issues.', promiseTitleHighlight: 'Les Deux Sont Gagnantes.',
    atMinimum: 'Au minimum', worstCaseTitle: 'Un Date Mémorable',
    worstCaseDesc: "Même dans le meilleur des cas où l'alchimie ne se fait pas, votre préparation garantit que le rendez-vous soit agréable, mémorable et respectueux. Pas de silences gênants. Pas de connexions manquées.",
    greatConversation: 'Bonne conversation', funExperience: 'Expérience amusante', noRegrets: 'Pas de regrets',
    bestCaseBadge: 'Meilleur Scénario', dreamOutcome: 'Le rêve', bestCaseTitle: 'Il/Elle Devient Votre Partenaire',
    bestCaseDesc: "Avec la bonne préparation, une connexion authentique et de la confiance — votre date voit la meilleure version de vous. C'est ainsi que les premiers rendez-vous deviennent des histoires de « comment on s'est rencontrés ».",
    realConnection: 'Connexion réelle', foundTheOne: 'Trouvé le bon', loveStory: "Histoire d'amour",
    ourRole: 'Notre rôle', ourRoleTitle: 'Préparation & Exécution',
    ourRoleDesc: "Nous ne garantissons pas l'amour — personne ne le peut. Mais nous garantissons que vous arriverez à chaque date préparé, confiant et prêt à donner le meilleur de vous-même. Le reste dépend de vous.",
    compatibility: 'Compatibilité', conversation: 'Conversation', confidence: 'Confiance',
    featuresTitle: 'Tout pour un super date', featuresSubtitle: 'Trois puissantes fonctions IA pour des connexions significatives',
    feature1Title: 'Analyse de Compatibilité', feature1Desc: 'Obtenez des insights approfondis sur votre score de compatibilité, vos points communs et les frictions potentielles avant de vous rencontrer.',
    feature1Score: 'Score', feature1Values: 'Valeurs', feature1RedFlags: 'Signaux d\'alerte',
    feature2Title: 'Planificateur de Date Intelligent', feature2Desc: "Suggestions de lieux, recommandations d'horaires, conseils vestimentaires et estimations budgétaires générés par l'IA.",
    feature2Venues: 'Lieux', feature2Outfits: 'Tenues', feature2Budget: 'Budget',
    feature3Title: 'Guide de Conversation', feature3Desc: 'Ne manquez jamais de sujets. Obtenez des brise-glace, des ouvertures profondes et des astuces pour des conversations naturelles.',
    feature3Icebreakers: 'Brise-glace', feature3DeepTalk: 'Conversations profondes', feature3Humor: 'Humour',
    howItWorksTitle: 'Comment ça marche', howItWorksSubtitle: 'Trois étapes simples pour une vie amoureuse plus confiante',
    step1Title: 'Créez Votre Profil', step1Desc: 'Parlez-nous de vous — votre personnalité, vos centres d\'intérêt, votre style de dating et ce que vous cherchez.',
    step1Detail1: 'Traits de personnalité', step1Detail2: 'Intérêts & loisirs', step1Detail3: 'Objectifs amoureux',
    step2Title: 'Planifiez Votre Date', step2Desc: "Entrez les infos de votre date et obtenez une analyse de compatibilité IA et un plan personnalisé.",
    step2Detail1: 'Score de compatibilité', step2Detail2: 'Lieu & tenue', step2Detail3: 'Horaire & budget',
    step3Title: 'Obtenez des Sujets de Conversation', step3Desc: 'Recevez des ouvertures de conversation, des brise-glace et des conseils pour maintenir un flux naturel.',
    step3Detail1: 'Brise-glace', step3Detail2: 'Sujets profonds', step3Detail3: 'Histories amusantes',
    testimonialsTitle: 'Ce que disent nos utilisateurs', testimonialsSubtitle: 'De vraies histoires de personnes qui ont better daté',
    pricingTitle: 'Des prix simples et transparents', pricingSubtitle: 'Commencez gratuitement et évoluez quand vous êtes prêt',
    perMonth: '/mois', mostPopular: 'Le plus populaire',
    freeTierDesc: 'Parfait pour commencer', freeTierBtn: 'Commencer gratuitement',
    freeFeature1: '1 date par mois', freeFeature2: 'Score de compatibilité basique', freeFeature3: 'Plan de date simple',
    proTierDesc: 'Pour les daters sérieux', proTierBtn: 'Obtenir Pro',
    proFeature1: 'Dates illimitées', proFeature2: 'Analyse complète', proFeature3: 'Plans personnalisés', proFeature4: 'Guides de conversation', proFeature5: 'Debrief post-date IA',
    vipTierDesc: 'Compagnon dating premium', vipTierBtn: 'Obtenir VIP',
    vipFeature1: 'Tout dans Pro', vipFeature2: 'Matching avancé', vipFeature3: 'Sessions stratégiques hebdomadaires', vipFeature4: 'Analyse IA prioritaire', vipFeature5: 'Coaching relationnel',
    ctaTitle: 'Votre prochain date pourrait tout changer.', ctaSubtitle: 'Soyez préparé. Repartez avec une connexion. Au minimum, vous aurez une belle histoire à raconter. Au mieux ? Vous la raconterez ensemble.',
    ctaSubtext: 'Pire cas : un date mémorable. Meilleur cas : un partenaire pour la vie.',
    ctaButton: 'Commencez Votre Voyage',
    footerText: '© {year} DateWise AI. Des connexions réelles, un date à la fois.',
  },
  profile: {
    title: 'Créez Votre Profil', savedTitle: 'Profil enregistré !', savedSubtitle: 'Redirection vers votre tableau de bord...',
    step0Title: 'Infos de Base', step1Title: 'Personnalité', step2Title: 'Intérêts & Objectifs', step3Title: 'Préférences de Date',
    step0Desc: 'Commençons par les bases', step1Desc: 'Parlez-nous de votre personnalité et style', step2Desc: 'Quels sont vos centres d\'intérêt et que cherchez-vous ?', step3Desc: 'Comment aimez-vous passer vos dates ?',
    nameLabel: 'Votre Nom *', namePlaceholder: 'Entrez votre nom',
    genderLabel: 'Genre', ageLabel: 'Âge', heightLabel: 'Taille',
    bodyTypeLabel: 'Corpulence', communicationStyleLabel: 'Style de communication', humorStyleLabel: "Style d'humour", loveLanguageLabel: "Langage de l'amour",
    interestsLabel: 'Intérêts (sélectionnez tout ce qui s\'applique)', datingGoalsLabel: 'Objectifs de dating',
    dealBreakersLabel: 'Lignes rouges', dealBreakersPlaceholder: 'Fumer, distance, ne veut pas d\'enfants...', dealBreakersHint: 'Séparez par des virgules',
    budgetLabel: 'Fourchette de budget', settingsLabel: 'Cadres de date préférés',
    tipTitle: 'Conseil :', tipText: 'Vous pouvez toujours mettre à jour votre profil. Plus d\'infos vous donnez, mieux notre IA peut personnaliser votre expérience !',
    saveProfile: 'Enregistrer le profil',
    male: 'Homme', female: 'Femme', nonBinary: 'Non-binaire', preferNotToSay: 'Ne pas préciser',
    slim: 'Mince', average: 'Moyen', athletic: 'Sportif', plusSize: 'Rond',
    directConfident: 'Direct & Confiant', playfulFlirty: 'Joueur & Charmeur', thoughtfulReserved: 'Réfléchi & Réservé', warmConsiderate: 'Chaleureux & Attentionné',
    sarcasticWitty: 'Sarcastique & Spirituel', quickClever: 'Vif & Malin', warmGoofy: 'Chaleureux & Rigolo', dryDeadpan: 'Sec & Imperturbable',
    wordsOfAffirmation: 'Paroles valorisantes', actsOfService: 'Actes de service', qualityTime: 'Temps de qualité', gifts: 'Cadeaux',
    casual: 'Dating occasionnel', seriousRelationship: 'Relation sérieuse', marriage: 'Mariage', notSure: 'Pas sûr encore',
  },
  newDate: {
    title: 'Planifier un Nouveau Date', dateDetails: 'Détails du Date', dateDetailsDesc: 'Parlez-nous de votre prochain rendez-vous',
    dateNameLabel: 'Nom de la Date *', dateNamePlaceholder: 'Avec qui allez-vous ?',
    platformLabel: 'Où vous êtes-vous rencontrés ?', platformPlaceholder: 'Tinder, Hinge, par des amis...',
    bioLabel: 'Bio / Profil de la Date', bioPlaceholder: 'Collez sa bio ou décrivez ce que vous savez...',
    occasionLabel: 'Occasion', dateNumberLabel: 'Numéro du Date',
    locationLabel: 'Lieu / Ville', locationPlaceholder: 'Paris, Centre-ville, etc.',
    profileWarning: 'Veuillez d\'abord compléter votre profil pour une meilleure analyse.', profileWarningBtn: 'Aller au créateur de profil →',
    analyzeCompatibility: 'Analyser la Compatibilité', analyzingCompatibility: 'Analyse en cours...', checkingPlan: 'Vérification du plan...',
    firstDate: 'Premier date', secondDate: 'Deuxième date', anniversary: 'Anniversaire', birthday: 'Anniversaire de naissance', specialOccasion: 'Occasion spéciale', casualMeetup: 'Rencontre décontractée',
    compatibilityScore: 'Score de Compatibilité', greatMatch: 'Super match ! Vous avez un fort potentiel.', decentConnection: 'Bonne connexion avec de la marge de progression.', challengingMatch: 'Match difficile — mais les opposés s\'attirent !',
    alignmentAreas: 'Points communs', frictionPoints: 'Points de friction potentiels', complimentSuggestions: 'Suggestions de compliments', topicsToAvoid: 'Sujets à éviter',
    generateDatePlan: 'Générer le Plan de Date', generatingPlan: 'Génération du plan...',
    timing: 'Horaire', outfit: 'Tenue', budget: 'Budget', activityIdeas: 'Idées d\'activités',
    getTalkingPoints: 'Obtenir des Sujets de Conversation', generatingTalkingPoints: 'Génération en cours...',
    icebreakers: 'Brise-glace', deepConversationStarters: 'Ouvertures profondes', humorSuggestions: "Suggestions d'humour", steeringCues: 'Repères de conversation',
    allSetMsg: 'Tout est prêt ! Sauvegardez ce date et révisez votre plan avant de partir.',
    saveAndGoToDashboard: 'Sauvegarder & Aller au Tableau de Bord',
    freeLimitReached: 'Limite gratuite atteinte', freeLimitReachedDesc: 'Vous avez utilisé votre date gratuite ce mois-ci. Passez à Pro pour des dates illimitées !',
    upgradeToPro: 'Passer à Pro', goBack: 'Retour', somethingWentWrong: 'Oups ! Quelque chose a mal tourné', takingTooLong: 'Trop long ?', aiComparing: 'Notre IA compare vos profils',
  },
  dashboard: {
    yourDashboard: 'Votre Tableau de Bord', noDatesYet: 'Pas encore de dates planifiées. Changeons ça !',
    readyForFirstDate: 'Prêt pour votre premier date ?', readyForFirstDateDesc: 'Ajoutez les détails de votre prochain date et laissez notre IA vous préparer.',
    planFirstDate: 'Planifiez Votre Premier Date', totalDates: 'Total', completed: 'Terminés', planned: 'Planifiés',
    datesPlural: 'dates planifiées', datesSingular: 'date planifiée', noDatesPlanned: 'Pas encore de dates planifiées.',
    dateNot: 'date', noLocation: 'Pas de lieu', statusCompleted: 'Terminé', statusCancelled: 'Annulé', statusPlanned: 'Planifié',
  },
  dateDetail: {
    dateNotFound: 'Date non trouvé', backToDashboard: 'Retour au tableau de bord', compatibilityScore: 'Score de Compatibilité',
    alignmentAreas: 'Points communs', frictionPoints: 'Frictions', topicsToAvoid: 'Sujets à éviter', complimentIdeas: 'Idées de compliments',
    datePlan: 'Plan de Date', timing: 'Horaire', outfit: 'Tenue', budget: 'Budget', talkingPoints: 'Sujets de conversation',
    postDateDebrief: 'Debrief Post-Date', suggestedFollowUp: 'Message de suivi suggéré :',
    noAnalysisYet: 'Pas encore d\'analyse', noAnalysisDesc: 'Allez à « Planifier un Nouveau Date » pour générer des insights.',
    startDebrief: 'Commencer le Debrief Post-Date',
  },
  debrief: {
    title: 'Debrief Post-Date', dateWith: 'Date avec', howDidItGo: 'Comment s\'est passé le date ?', rateExperience: 'Évaluez votre expérience',
    terrible: 'Terrible', notGreat: 'Pas terrible', okay: 'Correct', prettyGood: 'Plutôt bien !', amazing: 'Incroyable !',
    whatWentWell: 'Qu\'est-ce qui a bien marché ?', whatWentWellPlaceholder: 'Bonne conversation, bonne alchimie, super endroit...',
    whatWasAwkward: 'Qu\'est-ce qui était gênant ?', whatWasAwkwardPlaceholder: 'Silences gênants, sujets bizarres...',
    anySurprises: 'Des surprises ?', anySurprisesPlaceholder: 'Sujets inattendus, découvertes surprenantes...',
    getAiAnalysis: 'Obtenir l\'Analyse IA', analyzingDate: 'Analyse de votre date...',
    debriefComplete: 'Debrief terminé !', debriefCompleteSub: 'Voici ce que pense notre coach dating.',
    aiAnalysis: 'Analyse IA', recommendation: 'Recommandation', suggestedFollowUp: 'Message de suivi suggéré',
    copyMessage: 'Copier le message', copied: 'Copié !', backToDashboard: 'Retour au tableau de bord', planAnotherDate: 'Planifier un autre date',
  },
})

// Portuguese translations
const pt: TranslationDictionary = mergeWithBase(en, {
  nav: { home: 'Início', dashboard: 'Painel', newDate: 'Novo Encontro', loading: 'Carregando...' },
  common: { back: 'Voltar', cancel: 'Cancelar', save: 'Salvar', next: 'Próximo', previous: 'Anterior', submit: 'Enviar', retry: 'Tentar novamente', loading: 'Carregando...', saving: 'Salvando...', copy: 'Copiar', copied: 'Copiado!', tryAgain: 'Tentar novamente' },
  auth: { backToHome: 'Voltar ao Início', welcomeBack: 'Bem-vindo de volta', signInSubtitle: 'Entre para continuar sua jornada de encontros', createAccount: 'Criar Conta', signUpSubtitle: 'Junte-se ao DateWise e saia mais inteligente' },
  landing: {
    heroBadge: 'Coach de Encontros com IA', heroTitle1: 'Saiba Antes de', heroTitleHighlight: 'Sair',
    heroSubtitle: 'Preparação para encontros com IA que ajuda você a fazer conexões reais. Obtenha insights de compatibilidade, planos de encontro personalizados e guias de conversa — tudo antes do seu encontro.',
    getStartedFree: 'Comece Grátis', signIn: 'Entrar',
    statDatesPlanned: 'Encontros Planejados', statFeltConfident: 'Se Sentiram Mais Confiantes', statMoreSecondDates: 'Mais Segundos Encontros', statHappyUsers: 'Usuários Felizes',
    promiseBadge: 'A Promessa DateWise', promiseTitle1: 'Todo Encontro Tem Dois Desfechos.', promiseTitleHighlight: 'Ambos São Vitórias.',
    atMinimum: 'No mínimo', worstCaseTitle: 'Um Encontro para Lembrar',
    worstCaseDesc: "Mesmo no melhor dos casos onde não há química romântica, sua preparação garante que o encontro seja agradável, memorável e respeitoso. Sem silêncios constrangedores. Sem conexões perdidas.",
    greatConversation: 'Ótima Conversa', funExperience: 'Experiência Divertida', noRegrets: 'Sem Arrependimentos',
    bestCaseBadge: 'Melhor Cenário', dreamOutcome: 'O sonho', bestCaseTitle: 'Vem a Ser Seu Parceiro(a)',
    bestCaseDesc: "Com a preparação certa, conexão genuína e confiança — seu encontro vê a melhor versão real de você. É assim que primeiros encontros se tornam histórias de 'como nos conhecemos'.",
    realConnection: 'Conexão Real', foundTheOne: 'Encontrou a Pessoa Certa', loveStory: 'História de Amor',
    ourRole: 'Nosso papel', ourRoleTitle: 'Preparação & Execução',
    ourRoleDesc: "Não garantimos amor — ninguém pode. Mas garantimos que você entrará em cada encontro preparado, confiante e pronto para dar o melhor de si. O resto depende de você.",
    compatibility: 'Compatibilidade', conversation: 'Conversa', confidence: 'Confiança',
    featuresTitle: 'Tudo que você precisa para um ótimo encontro', featuresSubtitle: 'Três poderosas funções de IA trabalhando juntas para preparar você para conexões significativas',
    feature1Title: 'Análise de Compatibilidade', feature1Desc: 'Obtenha insights profundos sobre sua pontuação de compatibilidade, áreas de alinhamento e possíveis pontos de atrito antes de se encontrarem.',
    feature1Score: 'Pontuação', feature1Values: 'Valores', feature1RedFlags: 'Sinais de Alerta',
    feature2Title: 'Planejador Inteligente de Encontros', feature2Desc: 'Sugestões de locais, recomendações de horário, dicas de roupa e estimativas de orçamento geradas por IA para seu encontro.',
    feature2Venues: 'Locais', feature2Outfits: 'Roupas', feature2Budget: 'Orçamento',
    feature3Title: 'Guia de Conversa', feature3Desc: 'Nunca falte assunto. Receba quebra-gelos personalizados, iniciadores profundos e dicas de direção para conversas naturais.',
    feature3Icebreakers: 'Quebra-gelos', feature3DeepTalk: 'Conversa Profunda', feature3Humor: 'Humor',
    howItWorksTitle: 'Como funciona', howItWorksSubtitle: 'Três passos simples para uma vida amorosa mais confiante',
    step1Title: 'Crie Seu Perfil', step1Desc: 'Conte-nos sobre você — sua personalidade, interesses, estilo de encontros e o que procura.',
    step1Detail1: 'Traços de personalidade', step1Detail2: 'Interesses & hobbies', step1Detail3: 'Objetivos amorosos',
    step2Title: 'Planeje Seu Encontro', step2Desc: 'Insira os dados do encontro e receba uma análise de compatibilidade com IA e um plano personalizado.',
    step2Detail1: 'Pontuação de compatibilidade', step2Detail2: 'Local & roupa', step2Detail3: 'Horário & orçamento',
    step3Title: 'Receba Assuntos de Conversa', step3Desc: 'Receba iniciadores de conversa, quebra-gelos e dicas para manter a conversa fluindo naturalmente.',
    step3Detail1: 'Quebra-gelos', step3Detail2: 'Tópicos profundos', step3Detail3: 'Histórias divertidas',
    testimonialsTitle: 'O que nossos usuários dizem', testimonialsSubtitle: 'Histórias reais de pessoas que saíram mais inteligente',
    pricingTitle: 'Preços simples e transparentes', pricingSubtitle: 'Comece grátis e evolua quando estiver pronto',
    perMonth: '/mês', mostPopular: 'Mais Popular',
    freeTierDesc: 'Perfeito para começar', freeTierBtn: 'Começar Grátis',
    freeFeature1: '1 encontro por mês', freeFeature2: 'Pontuação básica de compatibilidade', freeFeature3: 'Plano de encontro simples',
    proTierDesc: 'Para quem quer relacionamentos sérios', proTierBtn: 'Obter Pro',
    proFeature1: 'Encontros ilimitados', proFeature2: 'Análise completa de compatibilidade', proFeature3: 'Planos personalizados', proFeature4: 'Guias de conversa', proFeature5: 'Debrief pós-encontro com IA',
    vipTierDesc: 'Companheiro de encontros premium', vipTierBtn: 'Obter VIP',
    vipFeature1: 'Tudo no Pro', vipFeature2: 'Matching avançado de personalidade', vipFeature3: 'Sessões semanais de estratégia', vipFeature4: 'Análise IA prioritária', vipFeature5: 'Coaching de relacionamento',
    ctaTitle: 'Seu próximo encontro pode mudar tudo.', ctaSubtitle: 'Entre preparado. Saia com uma conexão. No mínimo, você terá uma ótima história para contar. No melhor dos casos? Vocês contarão juntos.',
    ctaSubtext: 'Pior caso: um encontro memorável. Melhor caso: um parceiro para a vida.',
    ctaButton: 'Comece Sua Jornada',
    footerText: '© {year} DateWise AI. Fazendo conexões reais, um encontro de cada vez.',
  },
  profile: {
    title: 'Crie Seu Perfil', savedTitle: 'Perfil Salvo!', savedSubtitle: 'Levando você ao painel...',
    step0Title: 'Info Básica', step1Title: 'Personalidade', step2Title: 'Interesses & Objetivos', step3Title: 'Preferências de Encontro',
    step0Desc: 'Vamos começar com o básico', step1Desc: 'Conte-nos sobre sua personalidade e estilo', step2Desc: 'O que te interessa e o que procura?', step3Desc: 'Como gosta de passar seus encontros?',
    nameLabel: 'Seu Nome *', namePlaceholder: 'Digite seu nome',
    genderLabel: 'Gênero', ageLabel: 'Idade', heightLabel: 'Altura',
    bodyTypeLabel: 'Tipo de Corpo', communicationStyleLabel: 'Estilo de Comunicação', humorStyleLabel: 'Estilo de Humor', loveLanguageLabel: 'Linguagem do Amor',
    interestsLabel: 'Interesses (selecione todos)', datingGoalsLabel: 'Objetivos de Encontros',
    dealBreakersLabel: 'Impeditivos', dealBreakersPlaceholder: 'Fumar, distância, não quer filhos...', dealBreakersHint: 'Separe com vírgulas',
    budgetLabel: 'Faixa de Orçamento', settingsLabel: 'Ambientes Preferidos de Encontro',
    tipTitle: 'Dica:', tipText: 'Você pode sempre atualizar seu perfil! Quanto mais informações fornecer, melhor nossa IA pode personalizar sua experiência!',
    saveProfile: 'Salvar Perfil',
    male: 'Masculino', female: 'Feminino', nonBinary: 'Não-binário', preferNotToSay: 'Prefiro não dizer',
    slim: 'Magro', average: 'Médio', athletic: 'Atlético', plusSize: 'Plus Size',
    directConfident: 'Direto & Confiante', playfulFlirty: 'Brincalhão & Flertante', thoughtfulReserved: 'Pensativo & Reservado', warmConsiderate: 'Quente & Considerado',
    sarcasticWitty: 'Sarcástico & Espirituoso', quickClever: 'Rápido & Esperto', warmGoofy: 'Quente & Bobinho', dryDeadpan: 'Seco & Calmo',
    wordsOfAffirmation: 'Palavras de Afirmação', actsOfService: 'Atos de Serviço', qualityTime: 'Tempo de Qualidade', gifts: 'Presentes',
    casual: 'Encontros Casuais', seriousRelationship: 'Relacionamento Sério', marriage: 'Casamento', notSure: 'Não Tenho Certeza',
  },
  newDate: {
    title: 'Planejar Novo Encontro', dateDetails: 'Dados do Encontro', dateDetailsDesc: 'Conte-nos sobre seu próximo encontro',
    dateNameLabel: 'Nome do Encontro *', dateNamePlaceholder: 'Com quem vai se encontrar?',
    platformLabel: 'Onde se conheceram?', platformPlaceholder: 'Tinder, Hinge, por amigos...',
    bioLabel: 'Bio / Perfil do Encontro', bioPlaceholder: 'Cole a bio ou descreva o que sabe...',
    occasionLabel: 'Ocasião', dateNumberLabel: 'Número do Encontro',
    locationLabel: 'Local / Cidade', locationPlaceholder: 'São Paulo, Centro, etc.',
    profileWarning: 'Por favor complete seu perfil primeiro para uma melhor análise.', profileWarningBtn: 'Ir ao Criador de Perfil →',
    analyzeCompatibility: 'Analisar Compatibilidade', analyzingCompatibility: 'Analisando Compatibilidade...', checkingPlan: 'Verificando plano...',
    firstDate: 'Primeiro Encontro', secondDate: 'Segundo Encontro', anniversary: 'Aniversário', birthday: 'Aniversário de nascimento', specialOccasion: 'Ocasião Especial', casualMeetup: 'Encontro Casual',
    compatibilityScore: 'Pontuação de Compatibilidade', greatMatch: 'Ótima combinação! Você tem forte potencial.', decentConnection: 'Conexão decente com espaço para crescer.', challengingMatch: 'Desafiador — mas os opostos se atraem!',
    alignmentAreas: 'Áreas de Alinhamento', frictionPoints: 'Pontos Potenciais de Atrito', complimentSuggestions: 'Sugestões de Elogios', topicsToAvoid: 'Tópicos a Evitar',
    generateDatePlan: 'Gerar Plano de Encontro', generatingPlan: 'Gerando Plano...',
    timing: 'Horário', outfit: 'Roupa', budget: 'Orçamento', activityIdeas: 'Ideias de Atividades',
    getTalkingPoints: 'Obter Assuntos de Conversa', generatingTalkingPoints: 'Gerando Assuntos...',
    icebreakers: 'Quebra-gelos', deepConversationStarters: 'Iniciadores Profundos', humorSuggestions: 'Sugestões de Humor', steeringCues: 'Direção de Conversa',
    allSetMsg: 'Tudo pronto! Salve este encontro e revise seu plano antes de sair.',
    saveAndGoToDashboard: 'Salvar & Ir ao Painel',
    freeLimitReached: 'Limite Gratuito Atingido', freeLimitReachedDesc: 'Você usou seu encontro gratuito este mês! Faça upgrade para Pro para encontros ilimitados!',
    upgradeToPro: 'Atualizar para Pro', goBack: 'Voltar', somethingWentWrong: 'Ops! Algo deu errado', takingTooLong: 'Demorando muito?', aiComparing: 'Nossa IA está comparando seus perfis',
  },
  dashboard: {
    yourDashboard: 'Seu Painel', noDatesYet: 'Nenhum encontro planejado ainda. Vamos mudar isso!',
    readyForFirstDate: 'Pronto para seu primeiro encontro?', readyForFirstDateDesc: 'Adicione os dados do seu próximo encontro e deixe nossa IA ajudar.',
    planFirstDate: 'Planeje Seu Primeiro Encontro', totalDates: 'Total', completed: 'Concluídos', planned: 'Planejados',
    datesPlural: 'encontros planejados', datesSingular: 'encontro planejado', noDatesPlanned: 'Nenhum encontro planejado ainda.',
    dateNot: 'encontro', noLocation: 'Sem local', statusCompleted: 'Concluído', statusCancelled: 'Cancelado', statusPlanned: 'Planejado',
  },
  dateDetail: {
    dateNotFound: 'Encontro não encontrado', backToDashboard: 'Voltar ao Painel', compatibilityScore: 'Pontuação de Compatibilidade',
    alignmentAreas: 'Áreas de Alinhamento', frictionPoints: 'Pontos de Atrito', topicsToAvoid: 'Tópicos a Evitar', complimentIdeas: 'Ideias de Elogios',
    datePlan: 'Plano de Encontro', timing: 'Horário', outfit: 'Roupa', budget: 'Orçamento', talkingPoints: 'Assuntos de Conversa',
    postDateDebrief: 'Debrief Pós-Encontro', suggestedFollowUp: 'Mensagem de Seguimento Sugerida:',
    noAnalysisYet: 'Sem análise ainda', noAnalysisDesc: 'Vá para "Planejar Novo Encontro" para gerar insights.',
    startDebrief: 'Iniciar Debrief Pós-Encontro',
  },
  debrief: {
    title: 'Debrief Pós-Encontro', dateWith: 'Encontro com', howDidItGo: 'Como foi o encontro?', rateExperience: 'Avalie sua experiência geral',
    terrible: 'Péssimo', notGreat: 'Não muito bom', okay: 'Tava okay', prettyGood: 'Bem bom!', amazing: 'Incrível!',
    whatWentWell: 'O que foi bom?', whatWentWellPlaceholder: 'Ótima conversa, boa química, amei o lugar...',
    whatWasAwkward: 'O que foi constrangedor?', whatWasAwkwardPlaceholder: 'Silêncios constrangedores, assuntos estranhos...',
    anySurprises: 'Teve surpresas?', anySurprisesPlaceholder: 'Assuntos inesperados, descobertas surpreendentes...',
    getAiAnalysis: 'Obter Análise IA', analyzingDate: 'Analisando seu encontro...',
    debriefComplete: 'Debrief Concluído!', debriefCompleteSub: 'Veja o que nosso coach de encontros acha.',
    aiAnalysis: 'Análise IA', recommendation: 'Recomendação', suggestedFollowUp: 'Mensagem de Seguimento Sugerida',
    copyMessage: 'Copiar Mensagem', copied: 'Copiado!', backToDashboard: 'Voltar ao Painel', planAnotherDate: 'Planejar Outro Encontro',
  },
})

export const translations: Record<Locale, TranslationDictionary> = { en, es, de, fr, pt }

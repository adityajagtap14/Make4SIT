// Document Templates and Starter Content for Faculty Word Processor & Document Studio

export const TEMPLATE_TYPES = [
  {
    id: 'circular',
    name: 'Circular',
    category: 'Administrative',
    description: 'Official academic or event circular with institutional letterhead, date, workshop/event details, and copy-to list.',
    roles: ['faculty'],
    badge: 'Official Notice',
    color: 'emerald',
  },
  {
    id: 'mom',
    name: 'Meeting Circular / MOM',
    category: 'Governance & Meetings',
    description: 'Minutes of Meeting with letterhead, agenda items, proceedings, resolutions, and action plans.',
    roles: ['faculty'],
    badge: 'Minutes of Meeting',
    color: 'blue',
  },
  {
    id: 'action_plan',
    name: 'Meetings Action Plan',
    category: 'Planning & Execution',
    description: 'Quarterly / Annual Action Plan with structured activity table (Activity, Date, Responsible Person, Outcome).',
    roles: ['faculty'],
    badge: 'Action Matrix',
    color: 'purple',
  },
  {
    id: 'event_report',
    name: 'Event Report',
    category: 'Academic & Research Activities',
    description: 'Comprehensive 4-logo Event Report for workshops, technical talks, participant counts, outcomes, and photo grids.',
    roles: ['faculty'],
    badge: '4-Logo Official',
    color: 'amber',
  },
  {
    id: 'newsletter',
    name: 'Newsletter (Workshop & Talk)',
    category: 'Department Publications',
    description: 'High-impact 2/3-column magazine newsletter with mission, vision, key highlights, glimpses, and testimonials.',
    roles: ['faculty'],
    badge: 'Magazine Layout',
    color: 'rose',
  },
  {
    id: 'blank',
    name: 'Blank Document',
    category: 'Custom',
    description: 'Start with a clean page and full word processor formatting tools (fonts, sizes, tables, alignments).',
    roles: ['faculty'],
    badge: 'Freeform',
    color: 'slate',
  }
];

export const DEFAULT_TEMPLATES = {
  circular: {
    title: 'Circular - Workshop on Web and App Development',
    academicYear: '2025-26',
    date: '17-12-2025',
    detailsLabel: 'Workshop Details',
    toList: [
      'Head of the Department, all faculty members, and students of 1st and 3rd semesters'
    ],
    introText: 'This is to inform the Head of the Department, all faculty members, and students of 1st and 3rd semesters that a Workshop on Web and App Development is being organized in collaboration with Aspire Media.\n\nThe session will focus on current trends in web technologies, mobile application development, and practical industry-aligned skills. All concerned are requested to participate and encourage students to make effective use of this opportunity.',
    details: [
      { label: 'Topic', value: 'Web and App Development' },
      { label: 'Organized by', value: 'Aspire Media' },
      { label: 'Date', value: '23 December 2025' },
      { label: 'Time', value: '12:30 PM' },
      { label: 'Venue', value: 'Auditorium' },
      { label: 'Participants', value: '1st and 3rd Semester Students' }
    ],
    closingNote: 'All faculty members are requested to ensure smooth coordination and student participation.',
    signatory: 'PRINCIPAL',
    copyTo: ['All HOD', 'All Faculty Members']
  },

  mom: {
    title: 'Minutes of Meeting - Institution\'s Innovation Council Q3',
    trustName: "Shree Shetty Sangappa Trust's",
    cetCode: 'CET Code: E-216 (UG)',
    council: "Institution's Innovation Council",
    quarter: 'Quarter 3 (01 March – 31 May, 2026)',
    meetingDetails: {
      date: '20 Feb 2026',
      time: '02:00 PM',
      venue: 'Principal Office',
      chairperson: 'Dr. P. G. Rakaraddi',
      membersPresent: 'Faculty Coordinators'
    },
    agendaItems: [
      'Workshop on Product-Market Fit, Prototype Design and MVP Development',
      'Session on Business Model Canvas (BMC) and Business Model Fit',
      'AI-Powered Solution Expo and Demo Day',
      'Exposure Visit to Incubation Units and Patent Facilitation Centres',
      'Session on Start-up Legal and Ethical Steps',
      'Workshop on Raising Capital and Financial Management',
      'Workshop on Protecting IPR and IP Management',
      'Institutional Business Plan Competition',
      'Mentoring Event: Demo Day / Poster Presentation',
      'Celebration Day Activities (Q3)',
      'Review and Follow-up Mechanism'
    ],
    proceedings: [
      {
        item: 'Agenda Item 1: Workshop on Product-Market Fit, Prototype Design and MVP Development',
        resolution: 'It was resolved to organize a workshop on Product-Market Fit, Prototype Design, and MVP Development for students.',
        action: 'Scheduled for 07 March 2026. Faculty members and innovation mentors will conduct practical sessions.'
      },
      {
        item: 'Agenda Item 2: Business Model Canvas (BMC) and Business Model Fit Session',
        resolution: 'It was resolved to conduct a workshop on Business Model Canvas and Business Model Fit.',
        action: 'Scheduled for 14 March 2026.'
      },
      {
        item: 'Agenda Item 3: AI-Powered Solution Expo and Demo Day',
        resolution: 'It was resolved to organize an AI-Powered Solution Expo and Demo Day for AI and Industry 4.0 prototypes.',
        action: 'Scheduled for 28 March 2026.'
      },
      {
        item: 'Agenda Item 4: Exposure Visit to Incubation Units and Patent Facilitation Centres',
        resolution: 'It was resolved to arrange exposure visits to startup incubation and innovation centres.',
        action: 'Scheduled for 04 April 2026.'
      },
      {
        item: 'Agenda Item 5: Session on Start-up Legal and Ethical Steps',
        resolution: 'It was resolved to conduct a session on startup legal procedures and ethical responsibilities.',
        action: 'Scheduled for 11 April 2026.'
      },
      {
        item: 'Agenda Item 6: Workshop on Raising Capital and Financial Management for Start-ups',
        resolution: 'It was resolved to conduct a workshop on startup funding and financial management.',
        action: 'Scheduled for 18 April 2026.'
      },
      {
        item: 'Agenda Item 7: Workshop on Protecting IPR and IP Management',
        resolution: 'It was resolved to conduct a workshop on Intellectual Property Rights and IP management.',
        action: 'Scheduled for 02 May 2026.'
      },
      {
        item: 'Agenda Item 8: Institutional Business Plan Competition',
        resolution: 'It was resolved to organize an Inter/Intra Institutional Business Plan Competition.',
        action: 'Scheduled for 16 May 2026.'
      },
      {
        item: 'Agenda Item 9: Mentoring Event: Demo Day / Poster Presentation',
        resolution: 'It was resolved to conduct a mentoring event for project presentation and mentor interaction.',
        action: 'Scheduled for 23 May 2026.'
      },
      {
        item: 'Agenda Item 10: Celebration Day Activities',
        resolution: 'The council approved all celebration activities with active student participation.',
        action: 'International Women\'s Day (08 Mar), World Creativity & Innovation Day (21 Apr), World IP Day (26 Apr), National Technology Day (11 May), Idea Showcase (30 May).'
      },
      {
        item: 'Agenda Item 11: Review & Follow-up',
        resolution: 'Council resolved to review all activities and monitor progress at the beginning of every quarter.',
        action: 'Next review meeting scheduled for 31 May 2026.'
      }
    ],
    decisions: [
      'All Q3 activities were approved with tentative dates.',
      'Faculty coordinators were assigned responsibilities for workshops and competitions.',
      'Student representatives will coordinate event participation and project presentations.',
      'Industry experts and mentors will be invited for mentoring and technical sessions.'
    ],
    conclusion: 'The meeting concluded with all members agreeing to actively support and implement the planned activities for Quarter 3. The Chairperson emphasized innovation, collaboration, student participation, and alignment with institutional goals.',
    signatory: 'PRINCIPAL'
  },

  action_plan: {
    title: 'Quarterly Academic & Research Action Plan (Q1: January 01 – February 28, 2026)',
    council: "Institution's Innovation Council",
    instituteName: 'Shetty Institute of Technology',
    quarter: 'Q1',
    duration: '01 January 2026 – 28 February 2026',
    objectives: [
      'Promote student innovation through entrepreneurship-focused workshops and mentoring.',
      'Conduct IIC-mandated activities aligned with the national innovation calendar.',
      'Facilitate industry-academia interaction for startup ecosystem awareness.',
      'Encourage students and faculty to explore startup funding and IP management.',
      'Recognize and celebrate global innovation days through on-campus events.'
    ],
    activities: [
      {
        slNo: 1,
        event: 'Workshop on Product-Market Fit, Prototype Design and MVP Development',
        date: '07 March 2026',
        responsible: 'Faculty Coordinators & Innovation Mentors',
        participants: 'Students & Faculty',
        outcome: 'Practical understanding of MVP design, market validation, and prototype iteration'
      },
      {
        slNo: 2,
        event: 'Session on Business Model Canvas (BMC) and Business Model Fit',
        date: '14 March 2026',
        responsible: 'Faculty Coordinators',
        participants: 'Students & Faculty',
        outcome: 'Ability to design and evaluate business models for startups'
      },
      {
        slNo: 3,
        event: 'AI-Powered Solution Expo and Demo Day',
        date: '28 March 2026',
        responsible: 'IIC Coordinators',
        participants: 'Students & Faculty',
        outcome: 'Showcase of AI and Industry 4.0 prototypes by student teams'
      },
      {
        slNo: 4,
        event: 'Exposure Visit to Incubation Units and Patent Facilitation Centres',
        date: '04 April 2026',
        responsible: 'Faculty Coordinators',
        participants: 'Students & Faculty',
        outcome: 'Awareness on startup ecosystems, incubation support, and patent processes'
      },
      {
        slNo: 5,
        event: 'Session on Start-up Legal and Ethical Steps',
        date: '11 April 2026',
        responsible: 'Legal Experts & IIC Members',
        participants: 'Students & Faculty',
        outcome: 'Awareness on startup registration, legal compliance, and ethical practices'
      },
      {
        slNo: 6,
        event: 'Workshop on Raising Capital and Financial Management for Start-ups',
        date: '18 April 2026',
        responsible: 'Financial Experts & Entrepreneurship Mentors',
        participants: 'Students',
        outcome: 'Understanding of startup funding, fundraising, and financial planning'
      },
      {
        slNo: 7,
        event: 'Workshop on Protecting IPR and IP Management',
        date: '02 May 2026',
        responsible: 'IPR Experts & Faculty Coordinators',
        participants: 'Students & Faculty',
        outcome: 'Awareness on patents, copyrights, trademarks, and IP filing procedures'
      },
      {
        slNo: 8,
        event: 'Inter/Intra Institutional Business Plan Competition',
        date: '16 May 2026',
        responsible: 'IIC Coordinators & External Experts',
        participants: 'Students',
        outcome: 'Encourages entrepreneurial thinking and innovative business ideas'
      },
      {
        slNo: 9,
        event: 'Mentoring Event: Demo Day / Poster Presentation',
        date: '23 May 2026',
        responsible: 'Faculty Mentors & Industry Experts',
        participants: 'Students',
        outcome: 'Enhances project refinement, mentoring, and presentation skills'
      },
      {
        slNo: 10,
        event: "International Women's Day Celebration",
        date: '08 March 2026',
        responsible: "Women Empowerment Cell & IIC Team",
        participants: 'Students & Faculty',
        outcome: 'Awareness on women entrepreneurship and innovation'
      },
      {
        slNo: 11,
        event: 'World Creativity and Innovation Day Celebration',
        date: '21 April 2026',
        responsible: 'IIC Coordinators',
        participants: 'Students',
        outcome: 'Encourages idea generation, innovation challenges, and creative thinking'
      },
      {
        slNo: 12,
        event: 'World Intellectual Property Day Celebration',
        date: '26 April 2026',
        responsible: 'IPR Cell & Faculty Coordinators',
        participants: 'Students & Faculty',
        outcome: 'Awareness on patents, copyrights, and intellectual property rights'
      },
      {
        slNo: 13,
        event: 'National Technology Day Celebration',
        date: '11 May 2026',
        responsible: 'Department Coordinators & IIC Members',
        participants: 'Students & Faculty',
        outcome: 'Promotion of technological innovation and project demonstrations'
      },
      {
        slNo: 14,
        event: 'Quarterly Idea Showcase',
        date: '30 May 2026',
        responsible: 'Faculty Coordinators & Student Representatives',
        participants: 'Students',
        outcome: 'Presentation of innovative ideas, prototypes, and projects'
      },
      {
        slNo: 15,
        event: 'Quarterly Review & Follow-up Meeting',
        date: '01 March 2026 (Kick-off) & 31 May 2026 (Review)',
        responsible: 'Chairperson & Council Members',
        participants: 'Faculty Coordinators',
        outcome: 'Review of activities, participation, outcomes, and planning for next quarter'
      }
    ],
    overallOutcomes: [
      'Enhanced entrepreneurial mindset and startup ecosystem awareness among students.',
      'Improved knowledge of IPR, legal compliance, and startup funding mechanisms.',
      'Active participation in national innovation and celebration day events.',
      'Development of business plans, prototypes, and innovative ideas by students.',
      'Strengthened industry-academia linkages through expert-led workshops and mentoring.'
    ],
    signatory: 'PRINCIPAL'
  },

  event_report: {
    title: 'WORKSHOP ON "RAISING CAPITAL AND MANAGING FINANCE FOR STARTUPS"',
    date: '26th May 2026',
    organizedBy: 'Shetty Institute of Technology, Kalaburagi',
    venue: 'Auditorium',
    coordinator: 'Prof. Preeti Gangashetty',
    duration: '1 Day',
    mode: 'Offline',
    activityType: 'IIC Activity',
    introduction: 'The Institution\'s Innovation Council (IIC) organized a workshop on "Raising Capital and Managing Finance for Startups" with the objective of equipping students and faculty members with essential knowledge of startup funding and financial management. In today\'s competitive entrepreneurial landscape, access to capital and effective financial planning play a crucial role in determining the success and sustainability of startups. The workshop aimed to create awareness about various funding opportunities, including bootstrapping, angel investments, venture capital, government grants, bank loans, and crowdfunding. The session was conducted by Mr. Sujay Mudgal, Cluster Head, KDEM Kalaburagi, who shared valuable insights into fundraising strategies, investor expectations, financial planning, and startup ecosystem support mechanisms. The program provided participants with practical exposure to financial decision-making and encouraged them to explore entrepreneurial opportunities with greater confidence.',
    objective: 'The workshop was organized to provide students and faculty members with practical insights into startup fundraising strategies, financial planning, capital management, and various funding opportunities available for startups. The session aimed to create awareness about financial sustainability and investment readiness among aspiring entrepreneurs.',
    resourcePerson: {
      name: 'Mr. Sujay Mudgal',
      designation: 'Cluster Head, Kalaburagi Region',
      organization: 'Karnataka Digital Economy Mission (KDEM)'
    },
    speakerBio: 'Mr. Sujay Mudgal is an experienced startup ecosystem enabler and Cluster Head at KDEM, actively supporting innovation, entrepreneurship, startup growth, and industry-academia collaboration across the Kalaburagi region. He has been instrumental in mentoring startups and facilitating access to government support programs and investment opportunities.',
    participants: {
      students: 95,
      faculty: 15,
      total: 110
    },
    briefReport: 'The Institution\'s Innovation Council (IIC) organized a workshop on "Raising Capital and Managing Finance for Startups" to educate students and faculty members about startup funding mechanisms and financial management practices.<br><br>The session was delivered by Mr. Sujay Mudgal, Cluster Head, KDEM Kalaburagi, who shared valuable insights into the startup funding ecosystem and the importance of financial discipline in entrepreneurial ventures.<br><br>During the session, the speaker explained various sources of startup funding including:<br>• Bootstrapping and self-funding<br>• Angel Investments<br>• Venture Capital Funding<br>• Government Grants and Startup Schemes<br>• Bank Loans and Financial Assistance Programs<br>• Crowdfunding Platforms<br><br>Mr. Mudgal further discussed the importance of effective financial planning and management for startups. Key concepts covered included startup budgeting, cash flow management strategies, understanding unit economics, basics of startup valuation, financial projections and forecasting, and compliance and financial responsibilities of startups.',
    keyTakeaways: [
      'Understanding different funding options available for startups.',
      'Importance of financial planning from the early stages of a venture.',
      'Awareness about investor expectations and startup valuation.',
      'Knowledge of government grants and startup support schemes.',
      'Improved understanding of cash flow and financial management.',
      'Motivation among students and faculty to pursue entrepreneurial ventures.'
    ],
    outcomes: [
      'Participants gained practical knowledge about startup finance and fundraising.',
      'Increased awareness regarding government support and startup ecosystem opportunities.',
      'Enhanced entrepreneurial mindset among students and faculty members.',
      'Encouraged participants to develop financially sustainable business models.'
    ],
    photos: [
      { caption: 'Image 8.1: Inauguration of the Workshop', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80' },
      { caption: 'Image 8.2: Resource Person Mr. Sujay Mudgal Addressing Participants', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80' },
      { caption: 'Image 8.3: Interactive Q&A Session with Participants', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80' },
      { caption: 'Image 8.4: Group Photograph of Participants', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80' }
    ],
    conclusion: 'The workshop on "Raising Capital and Managing Finance for Startups" was successfully conducted with enthusiastic participation from 110 students and faculty members. Mr. Sujay Mudgal provided exceptional clarity on startup funding, investor expectations, and financial sustainability. The workshop succeeded in motivating attendees to pursue entrepreneurial ventures with greater financial confidence.',
    signatory: 'PRINCIPAL'
  },

  newsletter: {
    title: 'DISTINGUISHED LECTURE - NEXT-GENERATION COMPUTING & SUSTAINABLE TECHNOLOGIES',
    date: '18TH OCTOBER 2026',
    department: 'Faculty of Computer Science & Engineering',
    tagline: 'Pioneering Excellence in Research, Innovation, and Academic Leadership',
    brief: 'The Faculty of Computer Science & Engineering organized a Distinguished Lecture on "Next-Generation Computing & Sustainable Technologies" at the Institutional Auditorium. The session explored transformative paradigms in quantum algorithms, green cloud architectures, and responsible AI system development.',
    mission: 'To empower engineering faculty and scholars with advanced technological capabilities, foster multidisciplinary research innovation, and cultivate academic environments that solve complex industrial and societal problems.',
    vision: 'To be recognized as a premier center of technical excellence where faculty-led research drives groundbreaking innovations, intellectual property generation, and sustainable technological leadership.',
    objectives: [
      'To explore cutting-edge developments in quantum computing, neural accelerators, and green IT.',
      'To inspire faculty members to initiate multidisciplinary research projects.',
      'To bridge theoretical computational concepts with high-throughput enterprise architectures.',
      'To highlight sustainable engineering practices and energy-efficient algorithm design.',
      'To promote collaborative publications in internationally accredited journals.',
      'To encourage experiential learning and hardware-assisted laboratory demonstrations.'
    ],
    participationOverview: 'The distinguished lecture brought together faculty members, researchers, and students across the Engineering and Technology departments for an inspiring learning experience. Through expert keynote addresses, interactive panel discussions, and an embedded hardware showcase, participants gained comprehensive perspectives on future computational trends.',
    about: 'The technical lecture focused on the revolutionary changes taking place in global computing infrastructure. The session analyzed how emerging paradigms such as neuromorphic processing, edge intelligence, and carbon-neutral datacenters are reshaping engineering pedagogy and industrial applications.',
    highlights: [
      {
        title: 'Next-Gen Computing Paradigms',
        desc: 'The keynote explored how quantum computing, neuromorphic chips, and edge AI are redefining execution efficiency, algorithm design, and security architectures.'
      },
      {
        title: 'Sustainable & Green Engineering',
        desc: 'Emphasized that engineering excellence today requires energy-conscious computation, hardware lifecycle management, and sustainable algorithmic design.'
      }
    ],
    glimpses: [
      {
        title: 'Inauguration & Presidential Address',
        desc: 'Inaugurated by Dean Dr. Manjunath Swamy in the presence of HOD Dr. Sunita Deshmukh, Prof. Vikram Hegde, and keynote speaker Dr. Rajeshwari Kulkarni.'
      },
      {
        title: 'Distinguished Keynote Address',
        desc: 'Dr. Rajeshwari Kulkarni, Senior Scientist and Professor of Computational Engineering, delivered a masterclass on high-performance algorithms and research methodologies.'
      },
      {
        title: 'Hardware Accelerator Demonstration',
        desc: 'A hands-on demonstration of embedded AI accelerators and telemetry boards was conducted by Prof. Anand Joshi with active participant engagement.'
      }
    ],
    outcome: 'The lecture provided participants with deep architectural clarity on future computational frontiers, strengthened faculty research capabilities, and laid the foundation for collaborative research proposals.',
    testimonials: [
      {
        quote: 'The distinguished lecture provided groundbreaking perspectives on sustainable computing and hardware accelerators. It will guide our upcoming departmental research initiatives.',
        author: 'Senior Faculty Member, Dept. of CSE'
      },
      {
        quote: 'The interactive demonstration of embedded AI hardware was brilliant, illustrating how to introduce advanced system concepts into our laboratory exercises.',
        author: 'Assistant Professor & Research Scholar'
      }
    ],
    conclusion: 'The Distinguished Lecture on "Next-Generation Computing & Sustainable Technologies" proved to be an intellectually stimulating experience for all attendees. The session successfully connected cutting-edge technological advancements with academic research and classroom excellence.'
  },

  blank: {
    title: 'Untitled Faculty Document',
    content: '<p>Start typing your document here...</p>'
  }
};

export function buildReportHTML(data) {
  const { 
    studentName, usn, department, semester, academicYear, 
    facultyName, facultyDesignation,
    activity1Photos = [], activity2Photos = [], activity3Photos = [],
    isApproved = false 
  } = data;

  const getPhotos = (photos, captions) => {
    return photos.map((url, i) => `
      <div class="image-block">
        <img src="${url}" crossorigin="anonymous" />
        <p class="image-caption">${captions[i] || 'Activity Photo'}</p>
      </div>
    `).join('');
  };

  const act1Images = getPhotos(activity1Photos, [
    "Figure 1.1: Water Conservation Activity Site",
    "Figure 1.2: Students conducting site assessment"
  ]);

  const act2Images = getPhotos(activity2Photos, [
    "Figure 2.1: Traditional Rural Livelihoods",
    "Figure 2.2: Interacting with Rural Women for Economic Awareness"
  ]);

  const act3Images = getPhotos(activity3Photos, [
    "Figure 3.1: Rejuvenated School Environment",
    "Figure 3.2: NSS Volunteer at Government Primary School"
  ]);

  // Approved Stamp CSS & Element
  const stampCSS = `
    .approved-stamp {
      position: absolute;
      top: 50px;
      right: 50px;
      color: #10B981;
      border: 4px solid #10B981;
      font-size: 24pt;
      font-weight: bold;
      text-transform: uppercase;
      padding: 10px 20px;
      border-radius: 10px;
      transform: rotate(-15deg);
      opacity: 0.8;
      font-family: Arial, sans-serif;
    }
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${usn} - NSS Report</title>
  <style>
    /* Strict formatting for NSS BNSK459 */
    @page { size: A4; margin: 1in; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; }
    
    .page-break { page-break-after: always; }
    .text-center { text-align: center; }
    .text-justify { text-align: justify; }
    .bold { font-weight: bold; }
    .mt-4 { margin-top: 1rem; }
    .mt-8 { margin-top: 2rem; }
    .mt-12 { margin-top: 3rem; }
    
    /* Cover Page */
    .cover-border { border: 4px solid #1e3a8a; padding: 30px; height: 100%; position: relative; }
    .cover-header { font-size: 16pt; color: #7f1d1d; font-weight: bold; text-align: center; margin-bottom: 5px; }
    .cover-subheader { font-size: 11pt; text-align: center; margin-bottom: 20px; color: #7f1d1d; text-transform: uppercase;}
    .cover-title { font-size: 16pt; font-weight: bold; text-align: center; margin: 40px 0; }
    
    /* Certificate */
    .cert-title { font-size: 16pt; font-weight: bold; text-align: center; text-decoration: underline; margin-bottom: 30px; }
    .cert-body { font-size: 14pt; line-height: 2; text-align: justify; margin-bottom: 60px; }
    .signature-grid { display: flex; justify-content: space-between; margin-top: 80px; text-align: center; }
    .sign-block { font-weight: bold; }
    .sign-name { color: #dc2626; font-size: 12pt; margin-bottom: 5px;}

    /* Headers for regular pages */
    .page-header { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 20px; font-weight: bold; font-size: 11pt;}
    
    /* Table of contents */
    .toc-table { width: 100%; border-collapse: collapse; margin-top: 30px; }
    .toc-table th, .toc-table td { border: 1px solid #000; padding: 10px; text-align: center; }
    
    /* Content sections */
    .section-title { font-size: 14pt; font-weight: bold; text-align: center; margin: 30px 0 20px 0; }
    .sub-heading { font-size: 12pt; font-weight: bold; margin: 20px 0 10px 0; }
    .paragraph { text-indent: 40px; margin-bottom: 15px; text-align: justify; }
    
    /* Images */
    .image-block { text-align: center; margin: 20px 0; page-break-inside: avoid; }
    .image-block img { max-width: 100%; max-height: 350px; border: 1px solid #ccc; object-fit: contain; }
    .image-caption { font-size: 11pt; font-weight: bold; margin-top: 5px; }

    ${stampCSS}
  </style>
</head>
<body>

  <!-- ==================== COVER PAGE ==================== -->
  <div class="cover-border page-break">
    ${isApproved ? '<div class="approved-stamp">APPROVED</div>' : ''}
    <div class="cover-header">VISVESVARAYA TECHNOLOGICAL UNIVERSITY</div>
    <div class="cover-subheader">JNANA SANGAMA, BELAGAVI-590018, KARNATAKA</div>
    
    <div class="text-center mt-8">
      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Visvesvaraya_Technological_University_logo.png/220px-Visvesvaraya_Technological_University_logo.png" style="width:120px;" />
    </div>

    <div class="cover-title">
      ACTIVITY REPORT ON<br/>
      "NATIONAL SERVICE SCHEME (BNSK459)"
    </div>

    <div class="text-center bold mt-8">UNDER THE GUIDANCE OF</div>
    <div class="text-center mt-4"><span style="font-size: 14pt; font-weight: bold;">${facultyName}</span></div>
    <div class="text-center">Department of ${department} Engineering</div>

    <div class="text-center mt-12">Submitted by</div>
    <div class="text-center mt-4"><span style="font-size: 14pt; font-weight: bold;">${studentName} (${usn})</span></div>
    <div class="text-center">Bachelor of Engineering (${semester} Semester) ${academicYear}</div>

    <div class="text-center mt-12">
      <!-- Placeholder for College Logo -->
      <div style="font-size: 40pt; color: #1e3a8a; font-weight: bold; margin-bottom: 5px;">SIT</div>
      <div style="color: #1e3a8a; font-weight: bold;">Shetty Institute of Technology</div>
    </div>

    <div class="text-center mt-12 bold">DEPARTMENT OF ${department.toUpperCase()} ENGINEERING</div>
    <div class="text-center bold">SHETTY INSTITUTE OF TECHNOLOGY, KALABURAGI</div>
    <div class="text-center bold">ACADEMIC YEAR ${academicYear}</div>
  </div>

  <!-- ==================== CERTIFICATE ==================== -->
  <div class="cover-border page-break">
    ${isApproved ? '<div class="approved-stamp">APPROVED</div>' : ''}
    <div class="cover-header">VISVESVARAYA TECHNOLOGICAL UNIVERSITY</div>
    <div class="text-center mt-4" style="font-size: 14pt;">SHETTY INSTITUTE OF TECHNOLOGY<br/>KALABURAGI</div>
    
    <div class="text-center mt-8">
      <div style="font-size: 40pt; color: #1e3a8a; font-weight: bold; margin-bottom: 5px;">SIT</div>
      <div style="color: #1e3a8a; font-weight: bold;">Shetty Institute of Technology</div>
    </div>

    <div class="text-center mt-8" style="font-size: 14pt;">DEPARTMENT OF ${department.toUpperCase()} ENGINEERING</div>
    
    <div class="cert-title mt-8">CERTIFICATE</div>

    <div class="cert-body">
      This is to certify that <span class="bold" style="color:red;">${studentName} (${usn})</span> Studying in ${semester} Semester B.E. has Delivered the <span class="bold" style="color:red;">National Service Scheme (NSS)</span> for partial fulfilment of Bachelor of Engineering in <span class="bold" style="color:red;">DEPARTMENT OF ${department.toUpperCase()} ENGINEERING</span> prescribed by Visvesvaraya Technological University, Belagavi during the year ${academicYear}.
    </div>

    <div class="signature-grid">
      <div class="sign-block">
        <div class="sign-name">${facultyName}</div>
        <div>NSS Co-Ordinator</div>
      </div>
      <div class="sign-block">
        <div class="sign-name">HOD</div>
        <div>Head of Department</div>
      </div>
      <div class="sign-block">
        <div class="sign-name">Principal</div>
        <div>Principal</div>
      </div>
    </div>
  </div>

  <!-- ==================== ACKNOWLEDGEMENT ==================== -->
  <div class="cover-border page-break">
    <div class="cert-title" style="color: red; border:none; text-decoration:none;">ACKNOWLEDGEMENT</div>
    
    <div class="paragraph mt-8">
      Any achievement, be it scholastic or otherwise does not depend solely on the team efforts but also on the guidance, encouragement and co-operation of intellectuals, elders and friends. A number of personalities, in their own capacities have helped me in carrying out this NSS activity work. I would like to take this opportunity to thank them all.
    </div>

    <div class="paragraph mt-8">
      First of all, I would like to express my immense gratitude to <span class="bold" style="color:red;">Principal</span>, Shetty Institute of Technology, Kalaburagi for her help and inspiration during the tenure of the course.
    </div>

    <div class="paragraph mt-8">
      I also extend my sincere thanks to <span class="bold" style="color:red;">Head of the Department</span>, ${department} Engineering, Shetty Institute of Technology, for her constant encouragement.
    </div>

    <div class="paragraph mt-8">
      I express my deep sense of gratitude to <span class="bold" style="color:red;">${facultyName}</span> as a NSS coordinator for his/her valuable suggestions and encouragement. He/She was the one who provided me a dynamic intellectual and stimulating state of mind to work hard.
    </div>

    <div class="text-center mt-12 bold" style="text-align: right;">
      <span style="color: #1e3a8a;">${studentName.toUpperCase()} (${usn})</span>
    </div>
  </div>

  <!-- ==================== TABLE OF CONTENT ==================== -->
  <div class="cover-border page-break">
    <div class="cert-title" style="text-decoration: underline; color: #000;">Table of content</div>
    <table class="toc-table">
      <tr><th style="width: 10%">Sl.No</th><th style="width: 70%">Topics</th><th style="width: 20%">Pg.no</th></tr>
      <tr><td class="bold">1.</td><td class="bold text-left">Water Conservation Techniques – Role of Different Stakeholders</td><td class="bold">5</td></tr>
      <tr><td class="bold">2.</td><td class="bold text-left">Preparing an Actionable Business Proposal for Enhancing Village Income</td><td class="bold">9</td></tr>
      <tr><td class="bold">3.</td><td class="bold text-left">Helping Local Schools to Achieve Good Results and Enhance Enrolment</td><td class="bold">15</td></tr>
      <tr><td class="bold">4.</td><td class="bold text-left">Conclusion</td><td class="bold">21</td></tr>
    </table>
  </div>

  <!-- Header for standard pages -->
  <div class="page-header">
    <span>National Service Scheme</span>
    <span>BNSK459</span>
  </div>

  <!-- ==================== ACTIVITY 1 ==================== -->
  <div class="section-title">
    Activity 1:<br/>
    WATER CONSERVATION TECHNIQUES – ROLE OF<br/>DIFFERENT STAKEHOLDERS – IMPLEMENTATION
  </div>
  
  <div class="sub-heading">Introduction</div>
  <div class="paragraph">The "Developing Sustainable Water Management Systems for Rural Areas" activity was organized under the National Service Scheme (NSS) with the objective of promoting resource conservation, ecological balance, and social responsibility among students and rural communities. In recent years, water scarcity has emerged as one of the most serious global issues affecting human life and agricultural sustainability. Problems such as depleting groundwater levels, erratic rainfall patterns, prolonged droughts, and poor water infrastructure are increasing rapidly due to climate change, over-extraction, and inadequate conservation practices. Rural areas, which heavily depend on agriculture for their livelihood, are continuously facing the severe impacts of these water crises.</div>
  
  ${act1Images}

  <div class="paragraph">Water plays a vital role in maintaining ecological stability and supporting life on Earth. It is considered the most valuable natural resource because it provides the foundation for human health, sanitation, food security, and economic development. Sustainable water management systems help capture, store, and utilize water efficiently, ensuring that rural communities have a reliable supply even during dry seasons.</div>
  
  <div class="sub-heading">Objectives of the Activity</div>
  <div class="paragraph">The major objective of this activity was to create awareness among students and rural citizens regarding the importance of water conservation and sustainable usage. The activity aimed to encourage students to participate directly in the construction of water management structures and understand the role of groundwater recharge in maintaining ecological balance.</div>

  <div class="page-break"></div>
  <div class="page-header">
    <span>National Service Scheme</span>
    <span>BNSK459</span>
  </div>

  <!-- ==================== ACTIVITY 2 ==================== -->
  <div class="section-title">
    Activity 2:<br/>
    PREPARING AN ACTIONABLE BUSINESS PROPOSAL FOR<br/>ENHANCING VILLAGE INCOME AND APPROACH FOR<br/>IMPLEMENTATION
  </div>

  <div class="sub-heading">Introduction</div>
  <div class="paragraph">The activity on “Preparing an Actionable Business Proposal for Enhancing Village Income and Approach for Implementation” was organized under the National Service Scheme (NSS) with the objective of promoting rural entrepreneurship, economic empowerment, self-reliance, and social responsibility among students. India is a country known for its vast agrarian economy and a majority of its population residing in rural areas. People living in these villages heavily depend on traditional agriculture and local resources for their daily livelihood and survival. The strength of the rural economy lies in its local resources, traditional skills, agricultural produce, and hardworking communities.</div>

  ${act2Images}

  <div class="paragraph">Village income enhancement refers to the creation of supplementary livelihood opportunities, micro-enterprises, and sustainable business models for rural citizens. It promotes financial independence, skill development, equality, and economic responsibility among the rural population. A village can progress successfully only when its citizens have access to diverse income sources and work together for common financial goals despite market challenges.</div>

  <div class="page-break"></div>
  <div class="page-header">
    <span>National Service Scheme</span>
    <span>BNSK459</span>
  </div>

  <!-- ==================== ACTIVITY 3 ==================== -->
  <div class="section-title">
    Activity 3:<br/>
    Helping Local Schools to Achieve Good<br/>Results and Enhance Enrolment in<br/>Higher/Technical/Vocational Education
  </div>

  <div class="sub-heading">Introduction</div>
  <div class="paragraph">The activity on “Helping Local Schools to Achieve Good Results and Enhance Enrolment in Higher/Technical/Vocational Education” was organized under the National Service Scheme (NSS) with the objective of promoting educational equity, academic excellence, career awareness, and social responsibility among students.</div>

  <div class="paragraph">India is a country known for its massive youth demographic and the growing need for a highly skilled workforce. Educational institutions play a foundational role in shaping the future of these young minds and contributing to the development of society. The strength of the nation lies in its educated youth, who must be properly guided to transition from basic schooling to specialized careers with mutual respect and cooperation.</div>

  ${act3Images}

  <div class="paragraph">Achieving good results refers to improving the academic performance, conceptual understanding, and foundational knowledge of school students. It promotes feelings of confidence, equality, and academic responsibility among young learners. Enhancing enrolment in higher, technical, and vocational education refers to guiding students toward specialized fields that ensure employability and skill development. A nation can progress successfully only when its students have access to proper guidance and work together for common educational goals despite differences in social or economic backgrounds.</div>

  <div class="page-break"></div>
  <div class="page-header">
    <span>National Service Scheme</span>
    <span>BNSK459</span>
  </div>

  <!-- ==================== CONCLUSION ==================== -->
  <div class="sub-heading" style="font-size: 16pt;">Conclusion:</div>
  
  <div class="sub-heading">Developing Sustainable Water Management Systems for Rural Areas</div>
  <div class="paragraph">The Developing Sustainable Water Management Systems for Rural Areas activity conducted under NSS successfully promoted resource conservation and social responsibility among students and rural communities. The activity encouraged students to participate directly in the construction of water management structures and understand the importance of groundwater recharge and ecological balance. It helped increase rural self-reliance, reduce water scarcity, and promote sustainable agricultural practices.</div>

  <div class="sub-heading">Preparing an Actionable Business Proposal for Enhancing Village Income</div>
  <div class="paragraph">The Preparing an Actionable Business Proposal activity conducted under NSS successfully created awareness among students regarding rural entrepreneurship, financial independence, and economic empowerment. Through proposals and implementation planning, students expressed meaningful strategies promoting village income enhancement and self-reliance. The activity improved professional communication skills, analytical ability, financial planning, and social awareness among participants.</div>

  <div class="sub-heading">Helping Local Schools to Achieve Good Results</div>
  <div class="paragraph">The School Outreach and Mentoring activity conducted under NSS successfully improved academic focus, career awareness, and the learning environment of local school students. Through academic tutoring and career counseling programs, volunteers contributed toward creating a healthier, more inclusive, and motivating atmosphere for higher education. The activity promoted educational equity, skill development, teamwork, and social responsibility among students and volunteers.</div>

  <div class="sub-heading">Overall Conclusion</div>
  <div class="paragraph">All the three NSS activities were successfully conducted and created positive social, economic, and educational impact among students and society. The activities promoted environmental sustainability, rural economic empowerment, educational equity, and community development. Through active participation, students developed teamwork, leadership, discipline, creativity, communication skills, and social responsibility. Overall, the programs inspired students to become responsible citizens and contribute positively toward society and the environment.</div>

</body>
</html>`;
}

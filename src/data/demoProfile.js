// Demo profile data for testing the chatbot
export const demoProfile = {
  name: "Saurabh Person",
  title: "Senior QA Engineer & Automation Specialist",
  bio: "Passionate about creating robust testing frameworks and ensuring software quality. I specialize in automation testing, CI/CD pipelines, and building scalable test solutions.",
  skills: [
    "Selenium WebDriver",
    "Cypress",
    "Jest",
    "JavaScript",
    "Python",
    "Java",
    "TestNG",
    "Jenkins",
    "GitHub Actions",
    "Docker",
    "AWS",
    "Azure",
    "Postman",
    "Appium",
    "API Testing",
    "Performance Testing",
    "Mobile Testing"
  ],
  experience: `I have over 5 years of experience in software testing and quality assurance. My journey includes:

• **Senior QA Engineer** (2021-Present)
  - Led automation testing initiatives for multiple projects
  - Built comprehensive test frameworks using Selenium and Cypress
  - Implemented CI/CD pipelines with Jenkins and GitHub Actions
  - Mentored junior QA engineers and conducted training sessions

• **QA Engineer** (2019-2021)
  - Developed automated test suites for web and mobile applications
  - Performed API testing using Postman and REST Assured
  - Collaborated with development teams in Agile environments
  - Created detailed test documentation and reporting

• **Junior QA Tester** (2018-2019)
  - Executed manual testing for various software applications
  - Learned automation testing fundamentals
  - Participated in test case design and execution`,
  
  projects: `Here are some of my notable projects:

• **E-commerce Platform Testing Suite**
  - Built comprehensive automation framework for a large-scale e-commerce platform
  - Implemented cross-browser testing with Selenium Grid
  - Achieved 90% test automation coverage
  - Reduced regression testing time by 70%

• **Mobile App Testing Framework**
  - Developed automated tests for iOS and Android applications using Appium
  - Created device farm integration for parallel testing
  - Implemented visual regression testing
  - Supported 20+ mobile devices and OS versions

• **API Testing Framework**
  - Built robust API testing framework with detailed reporting
  - Integrated with CI/CD pipelines for automated execution
  - Created comprehensive test data management system
  - Achieved 100% API endpoint coverage

• **Performance Testing Implementation**
  - Designed and executed load testing strategies for high-traffic applications
  - Used JMeter and K6 for performance testing
  - Identified and resolved performance bottlenecks
  - Improved application response time by 40%`,
  
  contact: {
    email: "saurabh.person@example.com",
    linkedin: "https://linkedin.com/in/saurabhperson",
    github: "https://github.com/saurabhperson",
    portfolio: "https://saurabhperson.dev"
  },
  
  apiSettings: {
    provider: 'openai',
    apiKey: '',
    model: 'gpt-3.5-turbo'
  },
  
  youtubeVideos: [
    {
      id: 1,
      videoId: 'dQw4w9WgXcQ',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Automation Testing Demo'
    }
  ],
  
  files: [
    {
      id: 1,
      name: "Automation Testing Process",
      type: "video",
      url: "/videos/automation-process.mp4",
      title: "How I Approach Automation Testing",
      description: "A detailed walkthrough of my automation testing methodology"
    },
    {
      id: 2,
      name: "Test Framework Architecture",
      type: "image",
      url: "/images/framework-architecture.png",
      title: "Test Framework Architecture Diagram",
      description: "Visual representation of my test framework design"
    },
    {
      id: 3,
      name: "Resume.pdf",
      type: "document",
      url: "/documents/resume.pdf",
      title: "Detailed Resume",
      description: "Complete professional resume with all details"
    }
  ]
};

export default demoProfile;

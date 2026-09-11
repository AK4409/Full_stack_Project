export const quizzes = [
    {
      id: 1,
      courseId: 1,
      lessonId: 8,
      title: "React Hooks Quiz",
      description: "Test your understanding of React Hooks.",
      passingScore: 70,
  
      questions: [
        {
          id: 1,
          question: "Which hook is used to manage state in a React component?",
          options: [
            "useEffect",
            "useState",
            "useContext",
            "useRef",
          ],
          correctAnswer: "useState",
        },
  
        {
          id: 2,
          question: "Which hook is commonly used for side effects?",
          options: [
            "useState",
            "useMemo",
            "useEffect",
            "useCallback",
          ],
          correctAnswer: "useEffect",
        },
  
        {
          id: 3,
          question: "Can React Hooks be used inside class components?",
          options: [
            "Yes",
            "No",
            "Only useState",
            "Only useEffect",
          ],
          correctAnswer: "No",
        },
  
        {
          id: 4,
          question: "What must be followed when using Hooks?",
          options: [
            "Rules of Hooks",
            "Class rules",
            "DOM rules",
            "CSS rules",
          ],
          correctAnswer: "Rules of Hooks",
        },
      ],
    },
  
    {
      id: 2,
      courseId: 2,
      lessonId: null,
      title: "Node.js Fundamentals Quiz",
      description: "Test your Node.js knowledge.",
      passingScore: 70,
  
      questions: [
        {
          id: 1,
          question: "What runtime allows JavaScript to run outside the browser?",
          options: [
            "React",
            "Node.js",
            "MongoDB",
            "Express",
          ],
          correctAnswer: "Node.js",
        },
  
        {
          id: 2,
          question: "Which command initializes a Node.js project?",
          options: [
            "node init",
            "npm start",
            "npm init",
            "node create",
          ],
          correctAnswer: "npm init",
        },
      ],
    },
  ];
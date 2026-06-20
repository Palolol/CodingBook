// ═══════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════
let currentXP     = 420;
let currentHearts = 4;
let currentStreak = 7;
let quizAnswered  = false;

// ═══════════════════════════════════════════════════════
//  LESSONS DATA
// ═══════════════════════════════════════════════════════
const LESSONS = {
  tags: {
    title:   'HTML <span>Tags</span>',
    concept: 'Tags are the building blocks of HTML. They use angle brackets like <code>&lt;h1&gt;</code> and <code>&lt;p&gt;</code> to define elements. Most tags have an opening and closing form.',
    code:    `&lt;h1&gt;Big Heading&lt;/h1&gt;\n&lt;h2&gt;Smaller Heading&lt;/h2&gt;\n&lt;p&gt;This is a paragraph.&lt;/p&gt;\n&lt;strong&gt;Bold text&lt;/strong&gt;\n&lt;em&gt;Italic text&lt;/em&gt;`,
    q:       '🧠 Which tag makes text <em>bold</em>?',
    opts:    [['&lt;em&gt;', false], ['&lt;i&gt;', false], ['&lt;strong&gt;', true], ['&lt;b-text&gt;', false]]
  },
  elements: {
    title:   'HTML <span>Elements</span>',
    concept: 'An HTML element is everything from the start tag to the end tag. Elements can be nested inside each other, creating a parent-child relationship called the DOM tree.',
    code:    `&lt;div&gt;\n  &lt;h2&gt;I am a child&lt;/h2&gt;\n  &lt;p&gt;Inside my parent div&lt;/p&gt;\n&lt;/div&gt;`,
    q:       '🧠 What do we call an HTML tag with its content?',
    opts:    [['A node', false], ['An element', true], ['A block', false], ['A wrapper', false]]
  },
  attrs: {
    title:   'HTML <span>Attributes</span>',
    concept: 'Attributes provide extra information about elements. They appear inside the opening tag as name="value" pairs. Common attributes include <code>href</code>, <code>src</code>, <code>class</code>, and <code>id</code>.',
    code:    `&lt;a href="https://codequest.io"&gt;\n  Click me!\n&lt;/a&gt;\n\n&lt;img src="cat.jpg" alt="A cat"&gt;\n\n&lt;p class="intro"&gt;Hello!&lt;/p&gt;`,
    q:       "🧠 Which attribute specifies a link's destination?",
    opts:    [['src', false], ['href', true], ['link', false], ['url', false]]
  }
};

// ═══════════════════════════════════════════════════════
//  QUIZ QUESTIONS DATA
// ═══════════════════════════════════════════════════════
const QUIZ_QUESTIONS = [
  {
    q:    'What does HTML stand for?',
    opts: [
      ['HyperText Markup Language', true],
      ['HighText Machine Language', false],
      ['Hyperlink Text Mark Language', false],
      ['Home Tool Markup Language', false]
    ]
  },
  {
    q:    'Which tag defines the document body?',
    opts: [
      ['&lt;main&gt;', false],
      ['&lt;content&gt;', false],
      ['&lt;body&gt;', true],
      ['&lt;section&gt;', false]
    ]
  },
  {
    q:    'How do you make a numbered list?',
    opts: [
      ['&lt;ul&gt;', false],
      ['&lt;dl&gt;', false],
      ['&lt;list&gt;', false],
      ['&lt;ol&gt;', true]
    ]
  }
];

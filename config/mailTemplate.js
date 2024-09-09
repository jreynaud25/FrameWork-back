// an email template that can be used with Nodemailer to send emails

const HTML_TEMPLATE = (text) => {
  return `
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Framework.</title>
    <style>
      div {
        /* border-radius: 2rem; */
        font-family: "Plain";
        background-color: white;
      }
      .container {
        height: 100vh;
        /* width: 33.3333%; */
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      }
      .email {
        width: 80%;
        margin: 0 auto;
        background-color: white;
        padding: 20px;
      }
      .email-header {
        background-color: white;
        border: none;
        border-top: 1px solid black; /* Bord supérieur de 1px */
        border-bottom: 1px solid black; /* Bord inférieur de 1px */
        color: black;
        font-size: 0.8rem;
        /* border-radius: 0.4rem; */
        padding: 0.5rem;
        height: max-content;
        flex: 1;
        display: flex;
        justify-content: flex-start;
      }

      .email-body {
        padding: 20px;
      }
      .email-footer {
        background-color: white;
        border: none;
        border-top: 1px solid black; /* Bord supérieur de 1px */
        border-bottom: 1px solid black; /* Bord inférieur de 1px */
        color: black;
        font-size: 0.8rem;
        /* border-radius: 0.4rem; */
        padding: 0.5rem;
        height: max-content;
        flex: 1;
        display: flex;
        justify-content: flex-start;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="email">
        <div class="email-header">
          <h1>Framework.</h1>
        </div>
        <div class="email-body">
          <p>${text}</p>
        </div>
        <div class="email-footer">
          <p>Framework</p>
        </div>
      </div>
    </div>
  </body>
</html>
      `;
};

module.exports = HTML_TEMPLATE;

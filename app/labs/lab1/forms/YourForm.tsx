"use client";
export default function YourForm() {
  return (
    <form id="wd-your-form" onSubmit={(event) => event.preventDefault()}>
      <h4>Student Profile</h4>
      <p>
        Yingzi Zhang — Northeastern University. Graduate student, full-time.
        Expected graduation: December 2027.
      </p>
      <label htmlFor="wd-your-first-name">First name: </label>
      <input id="wd-your-first-name" name="firstName" defaultValue="Yingzi" />
      <br />
      <label htmlFor="wd-your-last-name">Last name: </label>
      <input id="wd-your-last-name" name="lastName" defaultValue="Zhang" />
      <br />
      <label htmlFor="wd-your-password">Practice password: </label>
      <input
        id="wd-your-password"
        name="practicePassword"
        type="password"
        placeholder="SAMPLE only; do not enter a real password"
        autoComplete="off"
      />
      <br />
      <label htmlFor="wd-your-bio">Why I am taking this course:</label>
      <br />
      <textarea
        id="wd-your-bio"
        name="bio"
        rows={4}
        cols={45}
        defaultValue="I am a computer science student at Northeastern University. My goal is to master the technologies covered in class and complete my first web development project."
      />
      <fieldset>
        <legend>Class standing</legend>
        <input
          id="wd-standing-undergraduate"
          name="your-standing"
          type="radio"
          value="UNDERGRADUATE"
        />
        <label htmlFor="wd-standing-undergraduate">Undergraduate</label>{" "}
        <input
          id="wd-standing-graduate"
          name="your-standing"
          type="radio"
          value="GRADUATE"
          defaultChecked
        />
        <label htmlFor="wd-standing-graduate">Graduate</label>
      </fieldset>
      <fieldset>
        <legend>Enrollment</legend>
        <input
          id="wd-enrollment-full"
          name="your-enrollment"
          type="radio"
          value="FULL_TIME"
          defaultChecked
        />
        <label htmlFor="wd-enrollment-full">Full-time</label>{" "}
        <input
          id="wd-enrollment-part"
          name="your-enrollment"
          type="radio"
          value="PART_TIME"
        />
        <label htmlFor="wd-enrollment-part">Part-time</label>
      </fieldset>
      <fieldset>
        <legend>Interests</legend>
        <input
          id="wd-interest-html"
          name="interests"
          type="checkbox"
          value="HTML"
        />
        <label htmlFor="wd-interest-html">HTML</label>{" "}
        <input
          id="wd-interest-react"
          name="interests"
          type="checkbox"
          value="REACT"
        />
        <label htmlFor="wd-interest-react">React</label>{" "}
        <input
          id="wd-interest-backend"
          name="interests"
          type="checkbox"
          value="BACKEND"
        />
        <label htmlFor="wd-interest-backend">Backend development</label>
      </fieldset>
      <label htmlFor="wd-your-major">Major: </label>
      <select id="wd-your-major" name="major" defaultValue="CS">
        <option value="CS">Computer Science</option>
        <option value="DS">Data Science</option>
        <option value="SE">Software Engineering</option>
      </select>
      <br />
      <label htmlFor="wd-your-topics">
        Topics to explore:
      </label>
      <br />
      <select
        id="wd-your-topics"
        name="topics"
        multiple
        defaultValue={["HTML", "REACT"]}
      >
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="REACT">React</option>
        <option value="NEXT">Next.js</option>
        <option value="DATABASES">Databases</option>
      </select>
      <br />
      <label htmlFor="wd-your-email">School email: </label>
      <input
        id="wd-your-email"
        name="email"
        type="email"
        defaultValue="zhang.yingzi@northeastern.edu"
      />
      <br />
      <label htmlFor="wd-your-graduation">Expected graduation year: </label>
      <input
        id="wd-your-graduation"
        name="graduationYear"
        type="number"
        min={2026}
        max={2040}
        defaultValue={2027}
      />
      <br />
      <label htmlFor="wd-your-start-date">Program start date: </label>
      <input id="wd-your-start-date" name="programStart" type="date" aria-describedby="wd-start-date-note" />
      <p id="wd-start-date-note">Program started in September 2024. The exact day is not specified, so the date field is left blank.</p>
      <br />
      <label htmlFor="wd-your-excitement">
        Course excitement (0–10):{" "}
      </label>
      <input
        id="wd-your-excitement"
        name="excitement"
        type="range"
        min={0}
        max={10}
        defaultValue={10}
      />
      <br />
      <button id="wd-your-save" type="submit">
        Save
      </button>{" "}
      <button
        id="wd-your-cancel"
        type="button"
        onClick={(event) => event.currentTarget.form?.reset()}
      >
        Cancel
      </button>
      <p>This HTML prototype does not store or send profile information.</p>
    </form>
  );
}

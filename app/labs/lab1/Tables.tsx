// Quiz data is fictional, following Chapter 1; it is not a student grade record.
export default function Tables() {
  return (
    <div id="wd-tables">
      <h4>Table Tag</h4>
      <table border={1} width="100%">
        <caption>Sample Quiz Grades</caption>
        <thead>
          <tr>
            <th>Quiz</th>
            <th align="center">Topic</th>
            <th align="center">Date</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Q1</td>
            <td align="center">HTML</td>
            <td align="center">2/3/21</td>
            <td align="right">85</td>
          </tr>
          <tr>
            <td>Q2</td>
            <td align="center">CSS</td>
            <td align="center">2/10/21</td>
            <td align="right">90</td>
          </tr>
          <tr>
            <td>Q3</td>
            <td align="center">JavaScript</td>
            <td align="center">2/17/21</td>
            <td align="right">95</td>
          </tr>
          <tr>
            <td>Q4</td>
            <td align="center">React</td>
            <td align="center">2/24/21</td>
            <td align="right">88</td>
          </tr>
          <tr>
            <td>Q5</td>
            <td align="center">Props</td>
            <td align="center">3/3/21</td>
            <td align="right">92</td>
          </tr>
          <tr>
            <td>Q6</td>
            <td align="center">State</td>
            <td align="center">3/10/21</td>
            <td align="right">90</td>
          </tr>
          <tr>
            <td>Q7</td>
            <td align="center">Routing</td>
            <td align="center">3/17/21</td>
            <td align="right">86</td>
          </tr>
          <tr>
            <td>Q8</td>
            <td align="center">Forms</td>
            <td align="center">3/24/21</td>
            <td align="right">94</td>
          </tr>
          <tr>
            <td>Q9</td>
            <td align="center">HTTP</td>
            <td align="center">3/31/21</td>
            <td align="right">91</td>
          </tr>
          <tr>
            <td>Q10</td>
            <td align="center">APIs</td>
            <td align="center">4/7/21</td>
            <td align="right">89</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Average</td>
            <td align="right">90</td>
          </tr>
        </tfoot>
      </table>
      <h5>My Web Development Learning Plan</h5>
      <table id="wd-your-table" border={1}>
        <thead>
          <tr>
            <th>Step</th>
            <th>Topic</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="right">1</td>
            <td align="center">HTML</td>
            <td>Build the structure of my first website.</td>
          </tr>
          <tr>
            <td align="right">2</td>
            <td align="center">CSS</td>
            <td>Style the website with the techniques covered in class.</td>
          </tr>
          <tr>
            <td align="right">3</td>
            <td align="center">React and Next.js</td>
            <td>Complete my first web development project.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

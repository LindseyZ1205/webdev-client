export default function Checkboxes() {
  return (
    <>
      <h5 id="wd-checkboxes">Checkboxes</h5>
      <p>Favorite movie genre:</p>
      <input
        type="checkbox"
        name="check-genre"
        id="wd-chkbox-comedy"
        value="comedy"
      />
      <label htmlFor="wd-chkbox-comedy">Comedy</label>
      <br />
      <input
        type="checkbox"
        name="check-genre"
        id="wd-chkbox-drama"
        value="drama"
      />
      <label htmlFor="wd-chkbox-drama">Drama</label>
      <br />
      <input
        type="checkbox"
        name="check-genre"
        id="wd-chkbox-scifi"
        value="scifi"
      />
      <label htmlFor="wd-chkbox-scifi">Science Fiction</label>
      <br />
      <input
        type="checkbox"
        name="check-genre"
        id="wd-chkbox-fantasy"
        value="fantasy"
      />
      <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
      <br />
    </>
  );
}

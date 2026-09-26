export default function RadioButtons() {
  return (
    <>
      <h5 id="wd-radio-buttons">Radio buttons</h5>
      <p>Favorite movie genre:</p>
      <input
        type="radio"
        name="radio-genre"
        id="wd-radio-comedy"
        value="comedy"
      />
      <label htmlFor="wd-radio-comedy">Comedy</label>
      <br />
      <input
        type="radio"
        name="radio-genre"
        id="wd-radio-drama"
        value="drama"
      />
      <label htmlFor="wd-radio-drama">Drama</label>
      <br />
      <input
        type="radio"
        name="radio-genre"
        id="wd-radio-scifi"
        value="scifi"
      />
      <label htmlFor="wd-radio-scifi">Science Fiction</label>
      <br />
      <input
        type="radio"
        name="radio-genre"
        id="wd-radio-fantasy"
        value="fantasy"
      />
      <label htmlFor="wd-radio-fantasy">Fantasy</label>
      <br />
      <p>How often do you watch movies?</p>
      <input
        type="radio"
        name="radio-frequency"
        id="wd-radio-daily"
        value="daily"
      />
      <label htmlFor="wd-radio-daily">Daily</label>
      <br />
      <input
        type="radio"
        name="radio-frequency"
        id="wd-radio-weekly"
        value="weekly"
      />
      <label htmlFor="wd-radio-weekly">Weekly</label>
      <br />
      <input
        type="radio"
        name="radio-frequency"
        id="wd-radio-rarely"
        value="rarely"
      />
      <label htmlFor="wd-radio-rarely">Rarely</label>
      <br />
    </>
  );
}

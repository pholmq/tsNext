import styles from "./Playbtn.module.css";
export default function Playbtn() {
  return (
    <>
      <div className={styles.playpause}>
        <input type="checkbox" value="None" id="playpause" name="check" />
        <label htmlFor="playpause" tabIndex={1}></label>
      </div>
      Playbtn
    </>
  );
}

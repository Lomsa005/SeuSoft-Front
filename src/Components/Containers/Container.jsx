import btnclose from "media/close.png";
import "./Container.scss";

export const Container = () => {
  return (
    <div className="container">
      <div className="backdrop">
        <div className="Tflex">
          <div className="Theader">Main</div>
          <img src={btnclose} alt="close button" />
        </div>
        <div className="Tline-circle"></div>
        <div className="Tline"></div>

        <div className="content-wrapper">
          <div className="scrollable-content">
            შექმნას საერთაშორისოდ ცნობადი, სტუდენტსა და მის წარმატებაზე
            ორიენტირებული, თანამედროვე სტანდარტების მქონე აკადემიური გარემო,
            რომელიც სტიმულს აძლევს სწავლას, სწავლებასა და კვლევას, შესაბამისად,
            ყველას უქმნის საკუთარი პოტენციალის სრული რეალიზების შესაძლებლობას და
            ამზადებს მაღალი კვალიფიკაციის მქონე კონკურენტუნარიან სპეციალისტებს
            შრომის ბაზრისათვის. ევროპის უმაღლესი საგანმანათლებლო სივრცის
            ღირებულებებსა და პრინციპებზე დაფუძნებული განათლების უზრუნველყოფა,
            ინოვაციური და მოქნილი მიდგომების გამოყენება სტუდენტებისა და
            საზოგადოების სხვადასხვა საჭიროებისა და მოთხოვნის საპასუხოდ, მომავალი
            ტენდენციების განჭვრეტა და ხარისხის გაუმჯობესებაზე ფოკუსირება, სეუ-ს
            მუდმივი მიზანია.
          </div>
        </div>
      </div>
      <div className="border"></div>
      <div className="inner-border"></div>
      <div className="outer-border"></div>
      <div className="tabs">
        <div className="tab tab1"></div>
        <div className="tab tab2"></div>
        <div className="tab tab3"></div>
        <div className="tab tab4"></div>
      </div>
      <div className="tab tab5"></div>
    </div>
  );
};


export const Footer = () => {
    return (
    <div className="footer">
        <div className="description">
            <h3 className="descriptionHeader">SeuSoft<span className="descriptionHeaderDot">.</span></h3>
            <p className="descriptionParagraph">კომპანია რომელიც ორიენტირებულია ხარისხის ზრდაზე, განვითარებაზე და წარმატებაზე</p>
        </div>
        <div className="links">
                <h4 className="linksHeader">ლინკები<span className="linksHeaderDot">.</span></h4>
                <ul className="linksList">
                    <li>სერვისები</li>
                    <li>პროდუქტები</li>
                    <li>პორტფოლიო</li>
                    <li>ჩვენს შესახებ</li>
                </ul>
        </div>
        <div className="contacts">
            <h4 className="contactsHeader">დაგვიკავშირდი<span className="contactsHeaderDot">.</span></h4>
            <ul className="contactsList">
                <li>თბილისი,წინანდლის N9</li>
                <li>Info@Seu.edu.com</li>
                <li><a></a></li>
            </ul>
        </div>

    </div>)
}
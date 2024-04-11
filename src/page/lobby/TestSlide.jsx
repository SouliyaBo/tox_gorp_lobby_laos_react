import React from 'react'
import { Slide, Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function TestSlide() {
    useEffect(() => {
        console.log("dataCradGame::: ", dataCradGame)
        const cardElements = document.querySelectorAll(".card");
        const bottomImg = document.querySelector(".bottom");
        cardElements[0].classList.remove("card")
        cardElements[0].classList.add("active-card");

        bottomImg.innerHTML = `
        <img src="/assets/images/Rectangle 382.svg" alt="game icon" />
        <img src="/assets/images/Rectangle 383.svg" alt="game icon" />
        <img src="/assets/images/Rectangle 384.svg" alt="game icon" />
        <img src="/assets/images/Rectangle 385.svg" alt="game icon" />
      `;
        const updateBottomImages = (index) => {
            if (index === 0) {
                bottomImg.innerHTML = `
          <img src="/assets/images/Rectangle 382.svg" alt="game icon" />
          <img src="/assets/images/Rectangle 383.svg" alt="game icon" />
          <img src="/assets/images/Rectangle 384.svg" alt="game icon" />
          <img src="/assets/images/Rectangle 385.svg" alt="game icon" />
        `;
            } else if (index === 1) {
                bottomImg.innerHTML = `
          <img src="/assets/images/Rectangle 382.png" alt="game icon" />
          <img src="/assets/images/Rectangle 383.png" alt="game icon" />
          <img src="/assets/images/Rectangle 384.png" alt="game icon" />
          <img src="/assets/images/Rectangle 385.png" alt="game icon" />
        `;
            } else if (index === 2) {
                bottomImg.innerHTML = `
          <img src="/assets/images/111.png" alt="game icon" />
          <img src="/assets/images/Rectangle 384.png" alt="game icon" />
          <img src="/assets/images/Rectangle 383.png" alt="game icon" />
          <img src="/assets/images/222.png" alt="game icon" />
        `;
            } else if (index === 3) {
                bottomImg.innerHTML = `
          <img src="/assets/images/444.png" alt="game icon" />
          <img src="/assets/images/555.png" alt="game icon" />
          <img src="/assets/images/666.png" alt="game icon" />
          <img src="/assets/images/111.png" alt="game icon" />
        `;
            }
            // Add other conditions for other cards if needed
        };

        const handleClick = (index) => {
            // biome-ignore lint/complexity/noForEach: <explanation>
            cardElements.forEach((card) => {
                card.classList.remove("active-card");
                card.classList.add("card");
            });
            cardElements[index].classList.remove("card");
            cardElements[index].classList.add("active-card");

            // Update bottom images based on the clicked card
            updateBottomImages(index);
        };

        cardElements.forEach((card, index) => {
            card.addEventListener("click", () => handleClick(index));
        });

        // Cleanup function
        return () => {
            cardElements.forEach((card, index) => {
                card.removeEventListener("click", () => handleClick(index));
            });
        };
    }, []);
    const images = [
        "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ];
    return (
        <div style={{ background: "#FFFF" }}>
            <div >sdlfjsfjsdfljs</div>
            <Slide
                autoplay={false}
                onChange={function noRefCheck() { }}
                onStartChange={function noRefCheck() { }}
            >
                <div className="each-slide-effect">
                    <div
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)'
                        }}
                    >
                        <span>
                            Slide 1
                        </span>
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80)'
                        }}
                    >
                        <span>
                            Slide 2
                        </span>
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)'
                        }}
                    >
                        <span>
                            Slide 3
                        </span>
                    </div>
                </div>
            </Slide>

            <section className="mobile-suggest-game-container">
                <div className="top flexBetween">
                    <div className="card">
                        <img
                            src="/assets/images/Cardgame/image 105.png"
                            alt="game icon"
                        />
                        <p>แนะนำบาคาร่า</p>
                    </div>
                    <div className="card">
                        <img src="/assets/images/Cardgame/slot12.png" alt="game icon" />
                        <p>สล็อตมาแรง</p>
                    </div>
                    <div className="card">
                        <img
                            src="/assets/images/Cardgame/ic-nav-menu-hot-game.png"
                            alt="game icon"
                        />
                        <p>4 เกมสล็อตแตกหนัก</p>
                    </div>
                    <div className="card">
                        <img
                            src="/assets/images/Cardgame/hot-summer-burning.png"
                            alt="game icon"
                        />
                        <p>เกมฮิต</p>
                    </div>
                </div>
                <div className="bottom" />
            </section>


            <section className="game-section">
                <div className="title flexBetween">
                    <div className="left flexBetween">
                        <img src="/assets/images/Cardgame/slot12.png" alt="logo" />
                        <h4>
                            สล็อตออนไลน์ <br />
                            รวมทุกค่ายเกม
                        </h4>
                    </div>
                    <div className="right">
                        <button type="button">เพี่มเตีม</button>
                    </div>
                </div>
                {/* <img
          src="/assets/images/Rectangle 392.png"
          alt="game"
          className="top-image"
        /> */}
                <div className="game-list">
                    <div className="image-column">
                        <button type="button">
                            <img src="/assets/images/Group 205.png" alt="game" />
                        </button>
                    </div>
                    <div>
                        <button type="button">
                            <img src="assets/images/Rectangle 393.png" alt="game" />
                        </button>
                        <button type="button">
                            <img src="assets/images/Rectangle 397.png" alt="game" />
                        </button>
                        <button type="button">
                            <img src="assets/images/Rectangle 398.png" alt="game" />
                        </button>
                    </div>
                    <button type="button">
                        <img src="assets/images/Rectangle 399.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 400.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 401.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 402.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 403.png" alt="game" />
                    </button>
                </div>
            </section>

            <section className="game-section">
                <div className="title flexBetween">
                    <div className="left flexBetween">
                        <img src="/assets/images/Cardgame/image 105.png" alt="logo" />
                        <h4>
                            คาสิโนสด บาคาร่า <br />
                            ออนไลน์
                        </h4>
                    </div>
                    <div className="right">
                        <button type="button">เพี่มเตีม</button>
                    </div>
                </div>
                {/* <img src="/assets/images/Rectangle 413.png" alt="game" className="top-image" /> */}
                <div className="game-list">
                    <div className="image-column">
                        <button type="button">
                            <img src="assets/images/sexy-game.png" alt="game" />
                        </button>
                    </div>
                    <div>
                        <button type="button">
                            <img src="assets/images/Rectangle 404.png" alt="game" />
                        </button>
                        <button type="button">
                            <img src="assets/images/Rectangle 405.png" alt="game" />
                        </button>
                        <button type="button">
                            <img src="assets/images/Rectangle 406.png" alt="game" />
                        </button>
                    </div>
                    <button type="button">
                        <img src="assets/images/Rectangle 407.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 411.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 409.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 410.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 411.png" alt="game" />
                    </button>
                </div>
            </section>

            <section className="game-section">
                <div className="title flexBetween">
                    <div className="left flexBetween">
                        <img src="/assets/images/image 92.png" alt="logo" />
                        <h4>เกมยิงปลา</h4>
                    </div>
                    <div className="right">
                        <button type="button">เพี่มเตีม</button>
                    </div>
                </div>
                {/* <img src="/assets/images/Rectangle 423.png" alt="game" className="top-image" /> */}
                <div className="game-list">
                    <div className="image-column">
                        <button type="button">
                            <img src="assets/images/jili-yingpa.png" alt="game" />
                        </button>
                    </div>
                    <div>
                        <button type="button">
                            <img src="assets/images/Rectangle 414.png" alt="game" />
                        </button>
                        <button type="button">
                            <img src="assets/images/Rectangle 415.png" alt="game" />
                        </button>
                        <button type="button">
                            <img src="assets/images/Rectangle 416.png" alt="game" />
                        </button>
                    </div>
                    <button type="button">
                        <img src="assets/images/Rectangle 417.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 418.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 419.png" alt="game" />
                    </button>
                    <button type="button">
                        <img src="assets/images/Rectangle 421.png" alt="game" />
                    </button>
                    {/* <button>
          <img src="assets/images/Rectangle 421.png" alt="game" />
        </button>  */}
                </div>
            </section>

        </div>
    )
}

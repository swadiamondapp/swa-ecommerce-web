import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Classes from "./FAQ.module.css";

function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="container">
        <div className="container">
          <div className={Classes.Main}>
            <h1 className={Classes.Title}>Freaquently asked questions</h1>
            <div className={Classes.SubText}>
              <p className={`${Classes.Home} ${Classes.HomeNew}`}>HOME /</p>
              <p className={Classes.NewArrival}>FAQ</p>
            </div>
          </div>
          <div className={Classes.DropDown}>
            <Accordion defaultActiveKey={[""]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header >
                  <div>
                    <p className={Classes.Question}>
                      Login and Account Related Information
                    </p>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <p className={Classes.Answer}>
                    {" "}
                    You’re welcome to browse swadiamonds.com any time without an
                    account. Once you decide to place an order, you’ll need to
                    set up an account to provide us with the details needed to
                    process your order. With an account you can enjoy a
                    personalized shopping experience, including recommendations,
                    quicker checkout, and a shareable wish list.
                  </p>

                  <p className={Classes.Answer}>
                    2. I need to make some changes; can I edit the details of my
                    account and/or change address, name and password? Of course
                    you can. Log-in to your account and you can do most edits
                    yourself except things like Email ID which requires you to
                    contact the Customer Service Team
                  </p>

                  <p className={Classes.Answer}>
                    3. I have forgotten my account password. What can I do? All
                    you need to do is go to the Login page, enter your username
                    or registered email and click on “Forgot.” We will send you
                    an email with instructions for resetting your password.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <p className={Classes.Question}>
                    {" "}
                    Is it necessary to have an account to shop on
                    swadiamonds.com?
                  </p>
                </Accordion.Header>
                <Accordion.Body>
                  <p className={Classes.Answer}>
                    {" "}
                    You’re welcome to browse swadiamonds.com any time without an
                    account. Once you decide to place an order, you’ll need to
                    set up an account to provide us with the details needed to
                    process your order. With an account you can enjoy a
                    personalized shopping experience, including recommendations,
                    quicker checkout, and a shareable wish list.
                  </p>

                  <p className={Classes.Answer}>
                    2. I need to make some changes; can I edit the details of my
                    account and/or change address, name and password? Of course
                    you can. Log-in to your account and you can do most edits
                    yourself except things like Email ID which requires you to
                    contact the Customer Service Team
                  </p>

                  <p className={Classes.Answer}>
                    3. I have forgotten my account password. What can I do? All
                    you need to do is go to the Login page, enter your username
                    or registered email and click on “Forgot.” We will send you
                    an email with instructions for resetting your password.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <p className={Classes.Question}>
                    {" "}
                    I need to make some changes; can I edit the details of my
                    account and/or change address, name and password?
                  </p>
                </Accordion.Header>
                <Accordion.Body>
                  <p className={Classes.Answer}>
                    {" "}
                    You’re welcome to browse swadiamonds.com any time without an
                    account. Once you decide to place an order, you’ll need to
                    set up an account to provide us with the details needed to
                    process your order. With an account you can enjoy a
                    personalized shopping experience, including recommendations,
                    quicker checkout, and a shareable wish list.
                  </p>

                  <p className={Classes.Answer}>
                    2. I need to make some changes; can I edit the details of my
                    account and/or change address, name and password? Of course
                    you can. Log-in to your account and you can do most edits
                    yourself except things like Email ID which requires you to
                    contact the Customer Service Team
                  </p>

                  <p className={Classes.Answer}>
                    3. I have forgotten my account password. What can I do? All
                    you need to do is go to the Login page, enter your username
                    or registered email and click on “Forgot.” We will send you
                    an email with instructions for resetting your password.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <p className={Classes.Question}>
                    I have forgotten my account password. What can I do?
                  </p>
                </Accordion.Header>
                <Accordion.Body>
                  <p className={Classes.Answer}>
                    You’re welcome to browse swadiamonds.com any time without an
                    account. Once you decide to place an order, you’ll need to
                    set up an account to provide us with the details needed to
                    process your order. With an account you can enjoy a
                    personalized shopping experience, including recommendations,
                    quicker checkout, and a shareable wish list.
                  </p>

                  <p className={Classes.Answer}>
                    2. I need to make some changes; can I edit the details of my
                    account and/or change address, name and password? Of course
                    you can. Log-in to your account and you can do most edits
                    yourself except things like Email ID which requires you to
                    contact the Customer Service Team
                  </p>

                  <p className={Classes.Answer}>
                    3. I have forgotten my account password. What can I do? All
                    you need to do is go to the Login page, enter your username
                    or registered email and click on “Forgot.” We will send you
                    an email with instructions for resetting your password.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;

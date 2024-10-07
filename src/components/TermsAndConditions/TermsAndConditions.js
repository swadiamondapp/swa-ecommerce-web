import React, { useEffect } from "react";
import Classes from "./TermsAndConditions.module.css";

function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={Classes.temsContainer}>
      <div className="container">
        <div className={Classes.Main}>
          <h1 className={Classes.Title}>Terms and Conditions</h1>
        </div>
        <div className={Classes.SubText}>
          <p className={Classes.Home}>HOME /</p>
          <p className={Classes.PrivacyPolicy}>Terms and Conditions</p>
        </div>
        <div className={Classes.Content}>
          <div className={Classes.Description}>
            <p className={Classes.SubHeading}>
              1. By Using This Website You Represent And Warrant That
            </p>
            <p className={Classes.Description}>
              You are 18 years of age or older and that your use of the Website
              and/or Services shall not violate any applicable law or
              regulation.
            </p>
            <ul>
              <li>
                a. All registration information you submit is truthful and
                accurate and that you agree to maintain the accuracy of such
                information.
              </li>
              <li>
                b. Your membership is solely for your personal and
                non-commercial use. Any use of this Website or its content other
                than for personal purposes is prohibited.
              </li>
              <li>
                c. Your personal and non-commercial use of this Website shall be
                subjected to the following restriction
              </li>
              <ul className={Classes.ulForDesk}>
                <li>
                  (i)you may not modify any content of the Website, including
                  but not limited to, any public display, description,
                  performance, sale, rental, pricing of the product;
                </li>
                <li>
                  (ii) you may not decompile, reverse engineer, or disassemble
                  the content, or (c) remove any copyright, trademark
                  registration, or other proprietary notices from the content.
                  You further agree not to access or use this Website in any
                  manner that may be harmful to the operation of this Website or
                  its content
                </li>
              </ul>
              <li>
                d. You will not (a) use any product or service available on the
                Website and / Services for commercial purposes of any kind, or
                (b) advertise or sell any products, services or otherwise
                (whether or not for profit), or solicit others (including,
                without limitation, solicitations for contributions or
                donations) or use any public forum for commercial purposes of
                any kind, or (c) use the Website and/or Services in any way that
                is unlawful, or harms www.swadiamonds.com or any other person or
                entity, as determined in the swadiamonds.com ’s sole discretion.
                In the event, you want to advertise your product contact 9995
                900 200.
              </li>
              <li>
                e. You will not post, submit, upload, distribute, or otherwise
                transmit or make available any software or other computer files
                that contain a virus or other harmful component, or otherwise
                impair or damage the Website and/or Services or any connected
                network, or otherwise interfere with any person or entity’s use
                or enjoyment of the Website and/or Services.
              </li>
              <li>
                f. You will not engage in any form of antisocial, disrupting, or
                destructive acts, including “flaming,” “spamming,” “flooding,”
                “trolling,” “phishing” and “briefing” as those terms are
                commonly understood and used on the Internet.
              </li>
              <li>
                g. You will not delete or modify any content of the Website
                and/or Services, including but not limited to, legal notices,
                disclaimers, or proprietary notices such as copyright or
                trademark symbols, logos, that you do not own or have express
                permission to modify.
              </li>
              <li>
                h. www.swadiamonds.com cannot and will not assure that other
                users are or will be complying with the foregoing rules or any
                other provisions of this Terms of Use, and, as between you and
                www.swadiamonds.com, you hereby assume all risk of harm or
                injury resulting from any such lack of compliance.
              </li>
              <li>
                i. All information, content, and material contained in the
                Website and/or Services are www.swadiamonds.com‘copyrighted
                property. All trademarks, services marks, trade names, and trade
                dress are proprietary to www.swadiamonds.com. No information,
                content, or material from the Website and/or Services may be
                copied, reproduced, republished, uploaded, posted, transmitted,
                or distributed in any way without www.swadiamonds.com ‘s express
                written permission.
              </li>
              <li>
                j. You acknowledge that when you access a link that leaves the
                Website, the site you will enter into is not controlled by
                www.swadiamonds.com and different terms of use and privacy
                policy may apply. By accessing links to other sites, you
                acknowledge that www.swadiamonds.com is not responsible for
                those sites. www.swadiamonds.com reserves the right to disable
                links from third-party sites to the Website, although
                www.swadiamonds.com is under no obligation to do so.
              </li>
            </ul>

            <p className={Classes.SubHeading}>
             
              You Expressly Understand And Agree That:
            </p>
            <p className={Classes.Description}>
              The information, content, and materials on this website and/or
              services are provided on an “as is” and “as available” basis.
              www.swadiamonds.com and all its affiliates, officers, employees,
              agents, partners, and licensors disclaim all warranties of any
              kind, either express or implied, including but not limited to,
              implied warranties on merchantability, fitness for a particular
              purpose, and non-infringement.
              <ul>
                {" "}
                <li>
                  a. www.swadiamonds.com makes all reasonable efforts to display
                  the products listed for sale on its website (s) as accurately
                  as possible. However, www.swadiamonds.com cannot guarantee
                  that your monitor’s display of any product colour, texture, or
                  detail will be accurate. www.swadiamonds.com does not warrant
                  those product descriptions or other content are accurate,
                  complete, reliable current, or error-free. While
                  www.swadiamonds.com makes every effort to ensure that the
                  products are described and priced accurately, in the event
                  that an item is deemed to be priced incorrectly,
                  www.swadiamonds.com reserves the right to refuse the sale of
                  that item.
                </li>
                <li>
                  b. www.swadiamonds.com does not warrant that the functions
                  contained in content, information, and materials on the
                  website and/or services, including, without limitation any
                  third party sites or services linked to the website and/or
                  services will be uninterrupted, timely, or error-free, that
                  the defects will be rectified, or that the website or the
                  servers that make such content, information, and materials
                  available are free of viruses or other harmful components.
                </li>
                <li>
                  c. Any material downloaded or otherwise obtained through the
                  website and/or services are accessed at your own risk, and you
                  will be solely responsible for any damage or loss of data that
                  results from such download to your computer system.
                </li>
                <li>
                  {" "}
                  d. You hereby indemnify, defend, and hold www.swadiamonds.com,
                  www.swadiamonds.com ‘s distributors, agents, representatives,
                  and other authorized users, and each of the foregoing
                  entities’ respective resellers, distributors, service
                  providers and suppliers, and all of the foregoing entities’
                  respective officers, directors, owners, employees, agents,
                  representatives, harmless from and against any and all losses,
                  damages, liabilities, and costs arising from your use of the
                  website.
                </li>
                <li>
                  e. You expressly understand that under no circumstances,
                  including, but not limited to, negligence, shall the Company
                  be liable to you or any other person or entity for any direct,
                  indirect, incidental, special, or consequential damages,
                  including, but not limited to damages for loss of profits,
                  goodwill, use, data, or other intangible losses, resulting
                  from circumstances, including but not limited to: (i) the use
                  or the inability to use the website and/or services; or (ii)
                  the cost of procurement of substitute goods and services
                  resulting from any goods, data, information or services
                  purchased or obtained or messages received or transactions
                  entered into through or from the website and/or services or
                  (iii) unauthorized access to or alteration of your
                  transmissions or data; (iv) statements or conduct of any third
                  party on the website and/or services; or (v) any other matter
                  relating to the website and/or services.
                </li>
                <li>
                  f. www.swadiamonds.com or any of the foregoing entities’
                  respective resellers, distributors, service providers, and
                  suppliers are relieved of all its responsibilities, if any, in
                  the event of failure of performance resulting directly or
                  indirectly from any act of force majeure or causes beyond the
                  company’s reasonable control including, without limitation,
                  acts of God, war, equipment and technical failures, electrical
                  power failures or fluctuations, strikes, labour disputes,
                  riots, civil disturbances, shortages of labour or materials,
                  natural disasters, orders of domestic or foreign courts or
                  tribunals, non-performance of third parties, or any reasons
                  beyond the reasonable control of the company or any of the
                  foregoing entities’ respective resellers, distributors,
                  service providers, and suppliers. you further acknowledge and
                  agree that neither the Company nor any of the foregoing
                  entities’ respective resellers, distributors, service
                  providers, and suppliers are responsible or liable for (a) any
                  incompatibility between the website and / or services and any
                  other website, service, software, or hardware or (b) any
                  delays or failures you may experience with any transmissions
                  or transactions relating to the website in an accurate or
                  timely manner. Some jurisdictions do not allow the exclusion
                  of certain warranties or the limitation or exclusion of
                  liability for incidental or consequential damages.
                  Accordingly, some of the above limitations may not apply to
                  you.
                </li>
                <li>
                  g. Each paragraph, clause, sub-clause, and provision of these
                  terms of use shall be severable from each other and if for any
                  reason any paragraph, clause, sub-clause or provision is
                  invalid or unenforceable, such invalidity or enforceability
                  shall not prejudice or in any way affect the validity or
                  enforceability of any other paragraph, clause, sub-clause, or
                  provision, which shall be read and construed so as to give
                  thereto, the full effect thereof, subject only to any contrary
                  provision of the law to the effect that where this provision
                  of this terms of use or any paragraph, clause, sub-clause or
                  provision hereof would be but for the provisions of this
                  paragraph read and construed as being void or ineffective it
                  shall nevertheless be a valid terms of use, paragraph, clause,
                  sub-clause, or provision, as the case may be, to the full
                  extent to which it is not contrary to any provision of the
                  law.
                </li>
                <li>
                  h. Those that access the website and/or services do so, on
                  their own initiative and are responsible for compliance with
                  all applicable laws including, but not limited to, any
                  applicable local laws. These terms of use are governed by the
                  laws of India. Any action, suit, or other legal proceedings,
                  which is commenced to resolve any matter arising under or
                  relating to this letter, shall be subject to the jurisdiction
                  of the courts at Ernakulam
                </li>
                <li>
                  i. All the contents on the website, of any manner, whatsoever,
                  is Copyrighted work is protected under Indian Copyright Act,
                  1957. The unauthorized reproduction and distribution of our
                  Copyrighted Work via the internet without our express
                  permission constitute copyright infringement under the
                  Copyright Act, 1957. Your act of infringement of our
                  Copyrighted copyright and proprietary right makes you liable
                  for action in law that includes prosecution under the Code of
                  Civil Procedure, 1908 and Code of Criminal Procedure, 1973
                </li>
                <li>
                  j. In the event of a breach of the terms and conditions of
                  this terms of use by the user, the user shall be promptly
                  liable to indemnify www.swadiamonds.com for all the costs,
                  losses, and damages caused to www.swadiamonds.com as a result
                  of such a breach. Further, in the event of your breach of
                  these terms of use, you agree that www.swadiamonds.com will be
                  irreparably harmed and will not have an adequate remedy in
                  money or damages. www.swadiamonds.com, therefore, shall be
                  entitled in such event to obtain an injunction against such a
                  breach from any court of competent jurisdiction immediately
                  upon request. www.swadiamonds.com ‘s right to obtain such
                  relief shall not limit its right to obtain other remedies.
                </li>
                <li>
                  k. Any failure of www.swadiamonds.com to exercise or enforce
                  any right or provision of these terms of use shall not operate
                  as a waiver of such right or provision.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;

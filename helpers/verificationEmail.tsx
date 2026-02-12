interface VerificationEmailProps {
  username: string;
  otp: string;
}
export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <>
      <style>
        {`
          @media only screen and (max-width: 370px) {
            .responsive-text {
              width: 95% !important;
            }
          }
          @media only screen and (max-width: 900px) {
        .responsive-box {
          width: 100%;
        }
      }
        `}
      </style>

      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{ backgroundColor: "rgb(246, 247, 250)", height: "900px" }}
      >
        <tbody>
          <tr>
            <td align="center">
              <table
                width="900px"
                cellPadding="0"
                cellSpacing="0"
                border={0}
                className="responsive-box"
                style={{
                  fontFamily: "Arial, sans-serif",
                  height: "800px",
                  backgroundColor: "white",
                }}
              >
                <tbody>
                  <tr style={{ height: "140px" }}>
                    <td align="center" style={{ paddingTop: "20px" }}>
                      <img
                        src="https://pub-5cbe1c5d7e7a425d8c0885384a1d45b5.r2.dev/moviemania.png"
                        className="responsive-text"
                        width="350"
                        height="auto"
                        style={{ display: "block" }}
                        alt="logo"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td
                      align="center"
                      style={{ height: "60px", paddingBottom: "58px" }}
                    >
                      <div
                        style={{
                          width: "80%",
                          height: "1px",
                          backgroundColor: "grey",
                        }}
                      />
                    </td>
                  </tr>

                  <tr style={{ height: "100px", verticalAlign: "middle" }}>
                    <td
                      align="center"
                      style={{
                        paddingTop: "10px",
                        fontSize: "16px",
                        height: "20px",
                        overflowWrap: "break-word",
                      }}
                    >
                      <p>Hello, {username}</p>
                    </td>
                  </tr>

                  <tr>
                    <td
                      align="center"
                      style={{
                        paddingTop: "20px",
                        fontSize: "14px",
                        overflowWrap: "break-word",
                      }}
                    >
                      To continue setting up your moviemania account, please
                      verify your account with the code below:
                    </td>
                  </tr>

                  <tr>
                    <td
                      align="center"
                      style={{
                        paddingTop: "40px",
                        fontSize: "80px",
                        fontWeight: "bold",
                        wordBreak: "break-all",
                        overflowWrap: "break-word",
                      }}
                    >
                      {otp}
                    </td>
                  </tr>

                  <tr>
                    <td
                      align="center"
                      style={{ paddingTop: "35px", fontSize: "12px" }}
                    >
                      This code will expire in 1 day. Please do not disclose
                      this code to others.
                      <br />
                      If you did not make this request, please disregard this
                      email.
                    </td>
                  </tr>

                  <tr style={{ height: "80px" }}>
                    <td align="center" style={{ paddingTop: "75px" }}>
                      <div
                        style={{
                          width: "80%",
                          height: "1px",
                          backgroundColor: "grey",
                        }}
                      />
                    </td>
                  </tr>

                  <tr style={{ height: "100px", fontSize: "12px" }}>
                    <td align="center" style={{ overflowWrap: "break-word" }}>
                      © 2026 moviemania. All Rights Reserved.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

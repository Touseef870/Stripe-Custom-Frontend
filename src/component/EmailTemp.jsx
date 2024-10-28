import React from 'react'

export default function EmailTemp() {
    return (
        <div>
            <div
                style={{
                    fontFamily: "Arial, sans-serif",
                    maxWidth: 750,
                    margin: "0 auto",
                    padding: 30,
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    backgroundColor: "#f9f9f9", // Light background for better contrast
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Added shadow for depth
                    color: "#333"
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        paddingBottom: 30,
                        backgroundColor: "black",
                        borderRadius: "8px 8px 0 0", // Rounded top corners
                    }}>
                    <img
                        src="https://plus.unsplash.com/premium_photo-1729880135754-a031fe7db49e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Company Logo"
                        style={{ maxWidth: 150, margin: "0 auto", padding: "1rem 0" }} // Added margin for spacing
                    />
                </div>
                <p style={{ fontSize: "1.4em", color: "#333", marginBottom: 10 }}>
                    Hello{" "}
                    <strong style={{ fontStyle: "italic" }}>
                        ${"{"}"name"{"}"}
                    </strong>
                    ,
                </p>
                <p style={{ fontSize: "1.2em", marginBottom: 20 }}>
                    We appreciate your interest in our services. Here are the details of your inquiry:
                </p>
                <table style={{ width: "100%", margin: "20px 0", fontSize: "1.1em", borderCollapse: "collapse" }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: "10px 0", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>Email:</td>
                            <td style={{ padding: "10px 0", borderBottom: "1px solid #ddd" }}>
                                ${"{"}"email"{"}"}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: "10px 0", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                                Description:
                            </td>
                            <td style={{ padding: "10px 0", borderBottom: "1px solid #ddd" }}>
                                ${"{"}"message"{"}"}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ padding: "20px 0", textAlign: "center" }}>
                    <p style={{ fontSize: "1.2em", marginBottom: 10 }}>
                        Please click the button below to complete your payment:
                    </p>
                    <a
                        href="http://localhost:5173/payment/${sessionId}"
                        target="_blank"
                        style={{
                            display: "inline-block",
                            padding: "15px 30px",
                            backgroundColor: "#3f97cf",
                            color: "#fff",
                            textDecoration: "none",
                            borderRadius: 5,
                            fontSize: "1.1em",
                            transition: "background-color 0.3s, transform 0.3s", // Added transition for hover effects
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = "#357ab8"}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = "#3f97cf"}
                    >
                        Complete Your Payment
                    </a>
                </div>
                <p style={{ marginTop: 30, fontSize: "1.1em" }}>
                    Thank you for choosing us. If you have any questions, feel free to reach out at any time.
                </p>
                <p style={{ marginTop: 30, fontWeight: "bold", fontSize: "1.2em" }}>
                    Best regards,
                </p>
                <p style={{ color: "#FF6F00", fontWeight: "bold", fontSize: "1.2em" }}>
                    Vehware Ltd.
                </p>
                <hr
                    style={{ border: "none", borderTop: "1px solid #ddd", margin: "30px 0" }}
                />
                <p style={{ fontSize: "1em", color: "#888", textAlign: "center" }}>
                    Date: ${"{"}"currentDate"{"}"}
                </p>
                <p style={{ fontSize: "1em", color: "#888", textAlign: "center", margin: "10px 0" }}>
                    <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        style={{ color: "#3f97cf", textDecoration: "none", margin: "0 15px" }}
                    >
                        Facebook
                    </a>{" "}
                    |
                    <a
                        href="https://www.twitter.com/"
                        target="_blank"
                        style={{ color: "#3f97cf", textDecoration: "none", margin: "0 15px" }}
                    >
                        Twitter
                    </a>{" "}
                    |
                    <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        style={{ color: "#3f97cf", textDecoration: "none", margin: "0 15px" }}
                    >
                        LinkedIn
                    </a>
                </p>
            </div>
        </div>


    )
}

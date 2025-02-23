import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 40,
          color: "white",
          background: "black",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="http://localhost:3000/logo-main.svg" alt="logo" />
        {/* <h2>مقالات و شخصيات كما لم تقرأها من قبل.</h2> */}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

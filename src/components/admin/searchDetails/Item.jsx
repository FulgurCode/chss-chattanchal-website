
import { useNavigate } from "react-router-dom";

export default function Item(props) {
  const router = useNavigate();
  return (
    <div>
      <div
        style={{
          flexDirection: "row",
          alignItems: "center",
          //   padding: 10,
          gap: 5,
        }}
        onClick={() => {
          router({
            pathname: "/admin/admission/profile",
            params: {
              ...props.data,
              ...props.data.qualifyingExamDetails,
              ...props.data.tcDetailsOnAdmission,
            },
          });
        }}
      >
        <text style={{ flex: 2, padding: 10, paddingTop: 15 }}>
          {props.data.name}
        </text>
        <text
          style={{
            flex: 1,
            padding: 10,
            paddingTop: 15,
            backgroundColor: "#efefef",
            textAlign: "center",
          }}
        >
          {props.data.admissionNo}
        </text>
        <text
          style={{
            flex: 1,
            padding: 10,
            paddingTop: 15,
            textAlign: "center",
          }}
        >
          {props.data.class}
        </text>
      </div>
    </div>
  );
}
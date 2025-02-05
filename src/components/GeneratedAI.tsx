import React from "react";

interface GeneratedAIProps {
  text: string;
  photo: string; 
}

const GeneratedAI: React.FC<GeneratedAIProps> = ({ text, photo }) => {
  return (
    <div>
      <h1>Generated AI</h1>

      {/* Display generated text */}
      <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f4f4f4", borderRadius: "8px" }}>
        <h3>Text:</h3>
        <p>{text}</p>
      </div>

      {/* Display generated photo */}
      {photo && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Photo:</h3>
          <img src={photo} alt="Generated AI" style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }} />
        </div>
      )}
    </div>
  );
};

export default GeneratedAI;

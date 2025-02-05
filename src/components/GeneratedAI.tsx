import React from "react";

export interface GeneratedAIProps {
  text?: string;
  photo?: string;
  capitalizedWordsCount?: number;
  wordsFollowedByNumbersCount?: number;
  yearParity?: string;
}

const GeneratedAI: React.FC<GeneratedAIProps> = ({
  text,
  photo,
  capitalizedWordsCount,
  wordsFollowedByNumbersCount,
  yearParity,
}: GeneratedAIProps) => {
  return (
    <div>
      <h5>Generated Text, Photo and Data</h5>

      {/* Display generated text */}
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          backgroundColor: "#f4f4f4",
          borderRadius: "8px",
        }}
      >
        <p>Text:</p>
        <p style={{ fontSize: "10px", justifyContent: "center" }}>{text}</p>
      </div>

      {/* Display generated photo */}
      {photo && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Photo:</h3>
          <img
            src={photo}
            alt="Generated AI"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
      )}

      {/* Display additional data */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Capitalized Words Count:</h3>
        <p>{capitalizedWordsCount}</p>
        <h3>Words Followed by Numbers Count:</h3>
        <p>{wordsFollowedByNumbersCount}</p>
        <h3>Year Parity:</h3>
        <p>{yearParity}</p>
      </div>
    </div>
  );
};

export default GeneratedAI;

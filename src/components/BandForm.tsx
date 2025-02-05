import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { BandFormValues, useBandForm } from "../hooks/useBandForm";
import GeneratedAI from "./GeneratedAI";
import {
  LastMetadata,
  Metadata,
  sendGenerateTextAndPhotoRequest,
} from "../services/api";
import { getLastMetadata } from "../services/api"; // Import the new API function

const BandForm: React.FC = () => {
  const { handleSubmit, control, formState, years, setValue } = useBandForm();
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<Metadata | null>(null);
  const [lastMetadata, setLastMetadata] = useState<LastMetadata | null>(null);

  // Fetch the last metadata on component mount and set form default values
  useEffect(() => {
    const fetchLastMetadata = async () => {
      try {
        const data = await getLastMetadata(); // Call the new API function
        setLastMetadata(data); // Store the response data

        // Set the form values if last metadata exists
        if (data) {
          setValue("name", data.name || "");
          setValue("band", data.band || "");
          setValue("year", data.year || "");
        }
      } catch (error) {
        console.error("Error fetching last metadata:", error);
      }
    };

    fetchLastMetadata();
  }, [setValue]);

  const handleFormSubmit = async (data: BandFormValues) => {
    setLoading(true);
    setGeneratedData(null); // Reset previous results

    try {
      const result = await sendGenerateTextAndPhotoRequest(data);
      setGeneratedData(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Decide which data to pass to GeneratedAI component (either generatedData or lastMetadata)
  const aiData =
    generatedData || lastMetadata
      ? {
          text: generatedData?.text || lastMetadata?.generated_text,
          photo: generatedData?.photo || lastMetadata?.photo_url,
          capitalizedWordsCount:
            generatedData?.capitalizedWordsCount ||
            lastMetadata?.capitalized_words_count,
          wordsFollowedByNumbersCount:
            generatedData?.wordsFollowedByNumbersCount ||
            lastMetadata?.words_followed_by_numbers_count,
          yearParity: generatedData?.yearParity || lastMetadata?.year_parity,
        }
      : null;

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", fontFamily: "Segoe UI" }}
      >
        Music Form
      </Typography>

      {/* Name Input */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            margin="normal"
            error={!!formState.errors.name}
            helperText={formState.errors.name?.message}
          />
        )}
      />

      {/* Band Textarea */}
      <Controller
        name="band"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Band"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            error={!!formState.errors.band}
            helperText={formState.errors.band?.message}
          />
        )}
      />

      {/* Year Dropdown */}
      <Controller
        name="year"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Year"
            fullWidth
            margin="normal"
            error={!!formState.errors.year}
            helperText={formState.errors.year?.message}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit(handleFormSubmit)}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Let's Get Rolling"}
      </Button>

      {/* Display Generated Result or Last Metadata */}
      {aiData && (
        <GeneratedAI
          text={aiData.text}
          photo={aiData.photo}
          capitalizedWordsCount={aiData.capitalizedWordsCount}
          wordsFollowedByNumbersCount={aiData.wordsFollowedByNumbersCount}
          yearParity={aiData.yearParity}
        />
      )}
    </Box>
  );
};

export default BandForm;

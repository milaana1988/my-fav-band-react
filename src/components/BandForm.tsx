import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TextField, Button, MenuItem, Box, Typography, CircularProgress } from "@mui/material";
import { BandFormValues, useBandForm } from "../hooks/useBandForm";
import GeneratedAI from "./GeneratedAI";
import { sendGenerateTextAndPhotoRequest } from "../services/api";

const BandForm: React.FC = () => {
  const { handleSubmit, control, formState, years } = useBandForm();
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<{ text: string; photo: string } | null>(null);

  const handleFormSubmit = async (data: BandFormValues) => {
    setLoading(true);
    setGeneratedData(null); // Reset previous results

    try {
      const result = await sendGenerateTextAndPhotoRequest(data);
      setGeneratedData(result);
    } catch (error: any) {
      alert("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center", fontFamily: "Segoe UI" }}>
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

      {/* Display Generated Result */}
      {generatedData && <GeneratedAI text={generatedData.text} photo={generatedData.photo} />}
    </Box>
  );
};

export default BandForm;

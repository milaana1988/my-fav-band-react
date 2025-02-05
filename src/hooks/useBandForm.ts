import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the form schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  band: yup.string().required("Band is required"),
  year: yup.number().required("Year is required").min(1960).max(2025),
});

// Generate year options dynamically
const years = Array.from({ length: 2025 - 1960 + 1 }, (_, i) => 1960 + i);

export interface BandFormValues {
  name: string;
  band: string;
  year: number;
}

export const useBandForm = () => {
  const form = useForm<BandFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", band: "Your favorite music band + a few words explaining why you chose them.", year: 2025 },
  });

  const onSubmit = (data: BandFormValues) => {
    console.log("Form Data:", data);
  };

  return { ...form, years, onSubmit };
};

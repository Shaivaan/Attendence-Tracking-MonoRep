import { memo, type FormEvent } from "react";
import { Input } from "../../components/shad-cn/input";
import { Button } from "../../components/shad-cn/button";
import { FormikContext, useFormik, useFormikContext } from "formik";
import { initialValues, validationSchema } from "./utils";
import { cn } from "../../lib/utils";
import HeadBack from "../../components/created/HeadBack";
import SimpleCameraCapture from "../../components/created/CameraCapture";

const MarkAttendenceForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (value) => {
      console.log(value);
    },
  });

  return (
      <FormikContext.Provider value={formik}>
        <HeadBack heading="Attendence Marking Form"/>
        <div className="rounded-[var(--radius)] bg-[var(--card-bg)] card  p-10 flex gap-10">
          <div className=" flex flex-col gap-5 flex-1">
              <FormTextField keyName="name" />
              <FormTextField keyName="email" />
              <Submit/>
          </div>
          <SimpleCameraCapture  keyName="photo"/>

        </div>
    </FormikContext.Provider>
  );
};

const FormTextFieldComp = ({
  keyName,
}: {
  keyName: keyof FormInitValueType;
}) => {
  const { values, handleChange, touched, errors } =
    useFormikContext<FormInitValueType>();
  const value = values[keyName] as string;
  const isError = touched[keyName] && errors[keyName];
  const errorMessage = touched[keyName] ? errors[keyName] : null;
  return (
    <div>
      <div className={cn("mb-2 ml-2 capitalize relative", isError && 'text-destructive')}>{keyName}</div>
      <Input
        onChange={handleChange}
        autoComplete="off"
        value={value}
        name={keyName}
        placeholder={`Enter ${keyName}`}
        className={cn(
          "border-[var(--text-color)] border-1 py-6",
          isError && "border-destructive"
        )}
      />
      {errorMessage && (
        <div className="text-[0.8rem] text-destructive absolute ml-2">
          {errorMessage + '*'}
        </div>
      )}
    </div>
  );
};

const Submit = () => {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      type="submit"
      onClick={(event) => handleSubmit(event as unknown as FormEvent<HTMLFormElement>)}
      className="py-6 bg-[#2563EB] text-white hover:bg-[#2563EB] mt-4"
      variant={"outline"}
    >
      Submit
    </Button>
  );
};

const FormTextField = memo(FormTextFieldComp);
export default MarkAttendenceForm;
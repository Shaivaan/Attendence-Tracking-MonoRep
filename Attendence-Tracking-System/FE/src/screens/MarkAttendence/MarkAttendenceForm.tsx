import { memo, type FormEvent } from "react";
import { Input } from "../../components/shad-cn/input";
import { Button } from "../../components/shad-cn/button";
import { FormikContext, useFormik, useFormikContext } from "formik";
import { initialValues, urlToFile, validationSchema } from "./utils";
import { base_url, cn, endpoints, getFormData, multipartHeader, routes } from "../../lib/utils";
import HeadBack from "../../components/created/HeadBack";
import SimpleCameraCapture from "../../components/created/CameraCapture";
import axios from "axios";
import { useToast } from "../../components/created/Toast";
import useZustandStore from "../../zustand/store";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MarkAttendenceForm = () => {
  const {showToast} = useToast();
  const {handleDashboardData,handleFormLoading} = useZustandStore();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async(value) => {
      const photoFile = await urlToFile(value.photo as unknown as string,value.name as unknown as string + '.jpeg');
      const data = {...value,photo:photoFile as unknown as string};
      await formSubmitFunction(data)
    },
  });

  const formSubmitFunction = async(value:FormInitValueType)=>{
    handleFormLoading(true);
    try{
      const {data} = await axios.post(base_url + endpoints.form , getFormData(value), {
      headers: multipartHeader
      });
      successHandler(data);
    }catch(err){
      const message = (err as any)?.response?.data?.message || 'Something Went Wrong';
      showToast({message,variant:'error'});
    }finally{
      handleFormLoading(false);
    }
  }


  const successHandler = (data : ResType)=>{
      const message = data?.message;
      let isSuccess = data.success;
      showToast({message:message,variant:isSuccess ? 'success' : 'error'});
      if(isSuccess) {
        formik.resetForm();
        navigate(routes.home);  
        handleDashboardData({isLoadedOnce:false,isLoading:true});
      }
  }
  

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
  const { formLoading } = useZustandStore();
  return (
    <Button
      type="submit"
      onClick={(event) => handleSubmit(event as unknown as FormEvent<HTMLFormElement>)}
      className="py-6 bg-[#2563EB] text-white hover:bg-[#2563EB] mt-4"
      variant={"outline"}
      disabled={formLoading}
    >
      {formLoading ? <LoaderCircle className="load-icon"/> : "Submit"}
    </Button>
  );
};

const FormTextField = memo(FormTextFieldComp);
export default MarkAttendenceForm;
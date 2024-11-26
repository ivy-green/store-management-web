import { RegisterFieldType } from "@/app/auth/register/page";
import { URL_LOGIN } from "@/assets/contraints";
import AuthService from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useRegister = () => {
    const route = useRouter();

    return useMutation({
        mutationFn: async (val: RegisterFieldType) => {
            // validate confirm password
            if (val.confirmPassword != val.password) {
                // toast.error("Confirm password not matching with Password. Please check again!");
                return;
            }

            await AuthService.register({
                fullname: val.fullname,
                username: val.username,
                password: val.password,
                bio: val.bio,
                email: val.email,
                roleCode: 2,
                phoneNumber: val.phoneNumber,
                branchCode: 3
            })
        },
        onMutate: () => {
            const toastId = toast.loading('Sending request...');
            return { toastId };
        },
        onSettled: (_data, _error, _variables, context) => {
            toast.dismiss(context?.toastId);
        },
        onSuccess: (_res) => {
            toast.success("Register successfully! Please login again");
            route.push(URL_LOGIN);
        },
        onError: (err) => {
            console.log(err);
            // // toast.error("Something went wrong");
        }
    })
}
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { pb } from "$lib/utils/api";

/** @type {import('./$types').Actions} */
export const actions = {
    reset: async (event) => {
        const data = await event.request.formData();
        const email = data.get("email");

        console.log("email", email);

        try {
            // Authenticate the user and get the token from the server
            await pb.collection('users').requestPasswordReset(email);

            const message = {
                type: "success",
                message: "Reset link sent",
            };

            setFlash(303, "/forgot-password", message, event);
        } catch (err) {
            console.log("err", err);
            if (err.response?.data.identity?.message) {
                const message = {
                    type: "error",
                    err: err.response?.data.identity?.message,
                    message: "Your email cannot be blank",
                };
                throw redirect(message, event);
            } else {
                const message = {
                    type: "error",
                    err: err.response?.message,
                    message: "wrong email",
                };
                throw redirect(message, event);
            }
        }
    }
};

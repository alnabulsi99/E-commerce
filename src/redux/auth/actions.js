import * as AUTH_CONSTANSTS from "./constants";
import magic from "../../lib/magic-sdk";

export function Login(email) {
  return async (dispatch) => {
    dispatch({
      type: AUTH_CONSTANSTS.AUTH_LOADING,
    });

    try {
      const res = await magic.auth.loginWithMagicLink({ email });
      if (res) {
        const Token = await magic.user.getIdToken();
        const userMetaData = await magic.user.getMetadata();

        localStorage.setItem("token", Token);
        localStorage.setItem("user", JSON.stringify(userMetaData));

        dispatch({
          type: AUTH_CONSTANSTS.AUTH_SUCCESS,
          payload: { userMetaData, Token },
        });
      }
    } catch (error) {
      dispatch({
        type: AUTH_CONSTANSTS.AUTH_ERROR,
        payload: error,
      });
    }
  };
}

import React, { useCallback } from "react";
import axios from "services/axios";

const accountDetailsContext = React.createContext();

export const useAccountDetailsContext = () => {
  const context = React.useContext(accountDetailsContext);
  if (context === undefined) {
    throw new Error(
      "useAccountDetailsContext must be used within a AccountDetailsProvider"
    );
  }
  return context;
};

export const AccountDetailsProvider = (props) => {
  const { userId } = props;
  const [accountDetails, setAccountDetails] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getAccountDetails = useCallback(async () => {
    try {
      const res = await (await axios.get(`/users/${userId}`)).data;

      setAccountDetails(res.data);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [userId]);

  React.useEffect(() => {
    getAccountDetails();
  }, [getAccountDetails]);

  const value = React.useMemo(() => {
    const deleteAccount = async (account) => {
      try {
        const res = await (await axios.delete(`/users/${account.id}`)).data;
        return res;
      } catch (error) {
        setError(error);
      }
    };

    const updateAccount = async (account) => {
      try {
        const res = await (
          await axios.put(`/users/${accountDetails.uid}`, account)
        ).data;
        getAccountDetails();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    return {
      accountDetails,
      loading,
      error,
      deleteAccount,
      updateAccount,
    };
  }, [accountDetails, loading, error, getAccountDetails]);

  return (
    <accountDetailsContext.Provider value={value}>
      {props.children}
    </accountDetailsContext.Provider>
  );
};

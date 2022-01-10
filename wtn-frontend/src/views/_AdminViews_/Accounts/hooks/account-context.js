import React from "react";
import axios from "services/axios";

const accountContext = React.createContext();

export const useAccountContext = () => {
  const context = React.useContext(accountContext);
  if (context === undefined) {
    throw new Error("useAccountContext must be used within a AccountProvider");
  }
  return context;
};

export const AccountsProvider = (props) => {
  const [accounts, setAccounts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getAccounts = async () => {
    try {
      const res = await (await axios.get("/users")).data;

      setAccounts(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAccounts();
  }, []);

  const value = React.useMemo(() => {
    const addAccount = async (account) => {
      try {
        const res = await (await axios.post("/users", account)).data;
        getAccounts();
        return res;
      } catch (error) {
        setError(error);
      }
    };

    return {
      accounts,
      loading,
      error,
      addAccount,
    };
  }, [accounts, loading, error]);

  return (
    <accountContext.Provider value={value}>
      {props.children}
    </accountContext.Provider>
  );
};

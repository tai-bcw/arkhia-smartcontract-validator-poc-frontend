import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import { useParams } from 'react-router-dom';

import { useGetContract } from '@/api/useGetContract';


const ContractContext = createContext<Contract>({} as Contract);

interface Contract {
    contractId: string;
    setContractId: React.Dispatch<React.SetStateAction<string>>;
    contractInfo: [string, unknown][] | undefined;
    errorMessage: string;
    handleSubmitContractId: () => void;
    reset: () => void;
}

const ContractContextProvider = ({ children }: { children: JSX.Element }) => {
    const { contractId: contractIdParam } = useParams();

    const {
        data,
        isError,
        isLoading,
        handleChange
    } = useGetContract();

    const [contractId, setContractId] = useState(``);
    const [contractInfo, setContractInfo] = useState<[string, unknown][] | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState(``);

    useEffect(() => {
        if (contractIdParam) setContractId(contractIdParam);
    }, [contractIdParam]);

    useEffect(() => {
        console.log(data, isError, isLoading);

        if (isError && !isLoading)
            setErrorMessage(`Contract ID ${contractId} not found.`);

        if (data) {
            console.log(Object.entries(data));
            setContractInfo(Object.entries(data));
        }
    }, [contractId, data, isError, isLoading]);

    const handleSubmitContractId = useCallback(() => {
        if (contractId === ``) {
            setErrorMessage(`Please enter a Contract ID.`);
            return;
        }

        setContractInfo(undefined);
        setErrorMessage(``);
        handleChange(contractId);
    }, [contractId, handleChange]);

    const reset = () => {
        setContractId(``);
        setContractInfo(undefined);
        setErrorMessage(``);
    };

    const value = useMemo(
        () => ({
            contractId,
            setContractId,
            contractInfo,
            errorMessage,
            handleSubmitContractId,
            reset
        }),
        [
            contractId,
            contractInfo,
            errorMessage,
            handleSubmitContractId
        ]
    );

    return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};

export {
    ContractContext, ContractContextProvider
};

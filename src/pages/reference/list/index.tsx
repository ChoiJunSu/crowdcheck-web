import { useRecoilValue } from "recoil";
import loginAtom from "@atoms/loginAtom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IReferenceCandidate } from "@api/ReferenceApi/type";
import ReferenceApi from "@api/ReferenceApi";
import {
  CalendarIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/outline";

const ReferenceListPage = () => {
  const { type } = useRecoilValue(loginAtom);
  const navigate = useNavigate();
  if (type !== "personal") {
    alert("잘못된 접근입니다.");
    navigate(-1);
  }

  const [referenceList, setReferenceList] = useState<
    Array<IReferenceCandidate>
  >([]);

  const updateReferenceList = useCallback(async () => {
    const listCandidateResponse = await ReferenceApi.listCandidate();
    if (!listCandidateResponse.ok) return;
    setReferenceList(listCandidateResponse.references);
  }, []);

  useEffect(() => {
    (async () => {
      await updateReferenceList();
    })();
  }, []);

  const handleRemoveReference = useCallback(async (referenceId: number) => {
    if (!confirm("정말로 평판을 삭제하시겠습니까?")) return;
    const removeResponse = await ReferenceApi.remove({ referenceId });
    if (!removeResponse.ok) {
      alert(removeResponse.error);
    }
    alert("평판이 삭제되었습니다.");
    await updateReferenceList();
  }, []);

  return (
    <div className="sm:mx-auto sm:max-w-4xl bg-white shadow overflow-hidden rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {referenceList.map((reference, index) => (
          <li key={index}>
            <div className="block">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-xl sm:text-2xl font-medium text-gray-900 truncate">
                    {reference.writerName}님이 작성한 평판
                  </p>
                  <div className="mt-1 sm:mt-0 sm:ml-2 flex-shrink-0 flex">
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveReference(reference.id);
                      }}
                      className="sm:px-2 inline-flex text-md sm:text-lg leading-5 rounded-full font-medium text-gray-600 hover:text-cc-green"
                    >
                      삭제하기
                      <ChevronRightIcon className="self-center flex-shrink-0 mr-1.5 h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:grid-cols-6 text-md sm:text-lg text-gray-500">
                  <p className="mt-2 sm:col-span-2 flex sm:inline-flex items-center sm:mt-0">
                    <OfficeBuildingIcon
                      className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>함께 일한 회사</span>
                    <span className="mx-2 text-cc-green">
                      {reference.corporateName}
                    </span>
                  </p>
                  <p className="mt-2 sm:col-span-3 flex sm:inline-flex items-center sm:mt-0 sm:ml-6">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>등록일</span>
                    <span className="mx-2 text-cc-green">
                      {new Date(reference.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
        {referenceList.length === 0 && (
          <li className="text-gray-500 text-center sm:text-xl py-10">
            의뢰가 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
};

export default ReferenceListPage;

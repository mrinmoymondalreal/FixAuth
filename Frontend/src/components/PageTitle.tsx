import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";

const titleAtom = atom<{
  title: string;
  headerTitle: string;
}>({ title: "Quizo", headerTitle: "Quizo" });

function PageTitle() {
  const titleObj = useAtomValue(titleAtom);
  useEffect(() => {
    document.title = titleObj.title;
  }, [titleObj.title]);
}

export function setTitle(title: string, headerTitle?: string) {
  const set = useSetAtom(titleAtom);
  set({ title, headerTitle: headerTitle || title });
}

export function getTitle() {
  return useAtomValue(titleAtom);
}

export default PageTitle;

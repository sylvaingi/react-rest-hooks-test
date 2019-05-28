import React, { useMemo, useRef } from "react";
import { RestProvider, __INTERNAL__, State } from "rest-hooks";
import { useContext, useEffect } from "react";

export interface Cache<T> {
  save: (state: State<T>) => void;
  load: () => State<T> | undefined;
}

type Props<T> = {
  cache: Cache<T>;
} & React.ComponentProps<typeof RestProvider>;

const ResourceCachePersistor = <T extends any>({
  cache
}: {
  cache: Cache<T>;
}) => {
  const state = useContext(__INTERNAL__.StateContext);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    cache.save(state as State<T>);
  }, [state, cache]);

  return null;
};

const CachingRestProvider = <T extends any>({
  initialState: _,
  children,
  cache,
  ...props
}: Props<T>) => {
  const initialState = useMemo(() => cache.load(), [cache]);

  return (
    <RestProvider {...props} initialState={initialState}>
      <ResourceCachePersistor cache={cache} />
      {children}
    </RestProvider>
  );
};

export default CachingRestProvider;

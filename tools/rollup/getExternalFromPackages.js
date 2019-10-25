export function getExternalFromPackages(...pkgs) {
  return Object.keys(
    pkgs.reduce(
      (prev, pkg) => ({
        ...prev,
        ...pkg.dependencies,
        ...pkg.peerDependencies
      }),
      {}
    )
  );
}

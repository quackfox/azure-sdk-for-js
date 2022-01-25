function Get-javascript-OnboardedDocsMsPackages($DocRepoLocation) {
  $packageOnboardingFiles = @(
    "$DocRepoLocation/ci-configs/packages-latest.json",
    "$DocRepoLocation/ci-configs/packages-preview.json",
    "$DocRepoLocation/ci-configs/packages-legacy.json")

  $onboardedPackages = @{}
  foreach ($file in $packageOnboardingFiles) {
    $onboardingSpec = ConvertFrom-Json (Get-Content $file -Raw)
    foreach ($spec in $onboardingSpec.npm_package_sources) {
      $packageName = $spec.name
      if ($packageName.LastIndexOf('@') -gt 0) {
        # Package has an '@' symbol deliminting the end of the package name
        $packageName = $packageName.Substring(0, $packageName.LastIndexOf('@'))
      }
      $onboardedPackages[$packageName] = $null
    }
  }

  return $onboardedPackages
}

function Get-javascript-DocsMsTocData($packageMetadata, $docRepoLocation) {
  # Fallback to get package-level readme name if metadata file info does not exist
  $packageLevelReadmeName = $packageMetadata.Package.Replace('@azure/', '').Replace('@azure-tools/', '').Replace('azure-', '');

  # Fallback to get package-level readme name if metadata file info does not exist
  if ($packageMetadata.Package.StartsWith('@azure-rest/')) {
    $packageLevelReadmeName = "$($packageMetadata.Package.Replace('@azure-rest/', ''))-rest"
  }

  # If there is a metadata json for the package use the DocsMsReadmeName from
  # the metadata function
  if ($packageMetadata.FileMetadata) {
    $readmeMetadata = &$GetDocsMsMetadataForPackageFn -PackageInfo $packageMetadata.FileMetadata
    $packageLevelReadmeName = $readmeMetadata.DocsMsReadMeName
  }


  $packageTocHeader = $packageMetadata.Package
  if ($clientPackage.DisplayName) {
    $packageTocHeader = $clientPackage.DisplayName
  }
  $output = [PSCustomObject]@{
    PackageLevelReadmeHref = "~/docs-ref-services/{moniker}/$packageLevelReadmeName-readme.md"
    PackageTocHeader       = $packageTocHeader
    TocChildren            = @($clientPackage.Package)
  }

  return $output
}

function Get-javascript-DocsMsTocChildrenForManagementPackages($packageMetadata, $docRepoLocation) {
  return @($packageMetadata.Package)
}

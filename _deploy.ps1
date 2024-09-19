# Step 1: Read the current version from package.json
$packageJsonPath = ".\frontend\package.json"
$packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
Write-Host "----------------------------"
$currentVersion = $packageJson.version
Write-Host "Current Version: $currentVersion"
# Step 2: Prompt the user to input the new version
$newVersion = Read-Host "Enter new version"
# Step 3: Update the package.json with the new version
$packageJson.version = $newVersion
$packageJson | ConvertTo-Json -Depth 32 | Set-Content $packageJsonPath
Write-Host "Updated Version: $newVersion"

# Step 4: Build and Deploy
Write-Host "----------------------------"
Write-Host "Building..."
Set-Location ".\frontend\"
npm run build
Write-Host "Build Finished!"
Write-Host "----------------------------"
Write-Host "Deploying..."
firebase deploy
Write-Host "Deployed to the server"
Write-Host "----------------------------"

# Step 5: Return to the original directory
Set-Location "C:\Users\aksha\Documents\Projects\React\qwik-chat\"

$branch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $branch"

# Function to generate a commit message for a file change
function Generate-CommitMessage {
    param (
        [string]$status,
        [string]$fileName
    )

    switch ($status) {
        'A' { return "Added $fileName" }
        'M' { return "Modified $fileName" }
        'D' { return "Deleted $fileName" }
        default { return "Updated $fileName" }
    }
}

# Function to get a commit message from the user, with fallback to auto generation
function Get-CommitMessage {
    param (
        [string]$status,
        [string]$fileName
    )

    $customMessage = Read-Host "Enter a custom commit message for $fileName (press Enter to use auto-generated)"

    if ($customMessage) {
        return $customMessage
    } else {
        return Generate-CommitMessage -status $status -fileName $fileName
    }
}

$forcePush = $null
while ($forcePush -ne 'Y' -and $forcePush -ne 'N') {
    $forcePush = Read-Host "Do you want to force push to $branch? (Y/N)"
}

Write-Host "-----------------------------"

# Get the changed files
$diffOutput = git diff --name-status HEAD
if ($diffOutput) {
    $changes = $diffOutput -split "`n"
    foreach ($change in $changes) {
        $status = $change.Substring(0, 1)
        $filePath = $change.Substring(2).Trim()
        $fileName = [System.IO.Path]::GetFileName($filePath)

        Write-Host "Processing file: $fileName"
        # Stage the specific file
        git add $filePath
        Write-Host "Staged file: $fileName"

        # Get the commit message (either custom or auto-generated)
        $commitMessage = Get-CommitMessage -status $status -fileName $fileName
        Write-Host "Commit message for ${fileName}: $commitMessage"

        # Commit the file with the chosen commit message
        git commit -m $commitMessage
        Write-Host "Committed file: $fileName"
        Write-Host "-----------------------------"
    }

    # Push the commits
    Write-Host "Pushing commits to branch: $branch"
    if ($forcePush -eq 'Y') {
        git push origin $branch -f
        Write-Host "Force pushed to $branch."
    } else {
        git push origin $branch
        Write-Host "Pushed to $branch."
    }

    Write-Host "-----------------------------"
    Write-Host "Git push completed."
} else {
    Write-Host "No changes to commit."
}
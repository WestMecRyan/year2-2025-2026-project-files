## How to Create and Configure a GitHub SSH Key on Windows 🔑

This guide will walk you through creating a dedicated SSH key for your school laptop and configuring it to work with your GitHub account using Git Bash and PowerShell.

### Step 1: Generate Your New SSH Key

First, you'll create the key itself. This process generates two files: a private key (which you keep secret) and a public key (which you'll give to GitHub).

1.  Open **Git Bash**.
2.  Run the following command, replacing `yourschoolemail` with your actual school email address. This email acts as a label for the key.
    ```bash
    ssh-keygen -t ed25519 -C "yourschoolemail"
    ```
3.  When prompted to "Enter a file in which to save the key," you'll give the key a unique name so it doesn't overwrite any existing keys. A good practice is to name it after its purpose. Type the following path and press **Enter**:
    ```bash
    /c/Users/user/.ssh/github-wm
    ```
4.  You will be asked to "Enter passphrase (empty for no passphrase):". Press **Enter** twice to leave it blank. While a passphrase adds more security, we'll skip it for simplicity.

-----

### Step 2: Add the SSH Key to the SSH Agent

The ssh-agent is a background program that handles your SSH keys. You need to start it and add your new key to it.

1.  In the same Git Bash terminal, start the agent:
    ```bash
    eval "$(ssh-agent -s)"
    ```
2.  Now, add your newly created private key to the agent. This allows you to use the key without having to type a passphrase every time.
    ```bash
    ssh-add ~/.ssh/github-wm
    ```

-----

### Step 3: Copy Your Public Key and Add it to GitHub

Next, you'll copy the contents of your public key file (`.pub`) and paste it into your GitHub account settings.

1.  Display the public key and copy it to your clipboard with this single command:
    ```bash
    cat ~/.ssh/github-wm.pub | clip
    ```
2.  Go to your **GitHub account**.
3.  Click on your profile picture in the top-right corner and go to **Settings**.
4.  In the left sidebar, click on **SSH and GPG keys**.
5.  Click the **New SSH key** button.
6.  In the **Title** field, give it a descriptive name like "West-MEC Laptop".
7.  In the **Key** field, paste the key you copied from Git Bash. It should start with `ssh-ed25519`.
8.  Click **Add SSH key**.

-----

### Step 4: Configure Your SSH Client

The final step is to tell your computer when to use this specific key. You'll do this by creating a configuration file.

1.  Open **PowerShell** (or another code editor like VS Code).
2.  Open the SSH config file by running:
    ```powershell
    code ~/.ssh/config
    ```
    *If the file doesn't exist, your editor will create it.*
3.  Add the following text to the file. Make sure to replace `youruserfolder` with your actual Windows username (e.g., `C:/Users/jsmith/.ssh/github-wm`).
    ```
    Host github-wm
        HostName github.com
        User git
        IdentityFile /c/Users/youruserfolder/.ssh/github-wm
    ```
4.  Save and close the file. Your SSH key is now fully configured and ready to use for pushing and pulling from GitHub.
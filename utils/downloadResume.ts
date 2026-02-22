export const downloadResume = () => {
    const link = document.createElement("a")
    link.href = "/documents/resume_DE.pdf"
    link.download = "Lucas_Mouette_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
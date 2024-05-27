
export type MockFilesystemType = {
    directories: Record<string,string[]>,
    files:Record<string,{basename:string,yaml?:Record<string,string>}>
}

let sample:MockFilesystemType = {
    directories: {
        "root": ["Finance","Groceries","Kids"],
        "root/Finance":["Taxes 2023","Finalize finance weekend NYC.md","Pay holicday bill.md"],
        "root/Finance/Taxes 2023":["IRS Hotline","Get income statement work.md","Get mortgage details 2024.md"],
        "root/Finance/Taxes 2023/IRS hotline": ["Ask details re taxes 2023.md"]
    },
    files : {
        "root/Finance/Taxes 2023/IRS Hotline/Ask details re taxes 2023.md": {
            basename: "ask details re taxes 2023",
            yaml: {
                context: "None",
                status: "Waiting",
                starred: "⭐"
            }
        },
        "root/Finance/Taxes 2023/Get income statement work.md": {
            basename: "Get income statememt work",
            yaml: {
                context: "None",
                status: "Deferred",
                starred: "⭐"
            }
        },
        "root/Finance/Taxes 2023/Get mortgage details 2024.md": {
            basename: "Get mortgage details 2024",
            yaml: {
                context: "None",
                status: "Waiting",
                starred: "⭐"
            }
        },
        "root/Finance/Finalize finance weekend NYC.md": {
            basename: "Finalize finance weekend NYC",
            yaml: {
                context: "Deep",
                status: "Waiting",
                starred: "✰"
            }
        },
        "root/Finance/Pay holiday bill.md": {
            basename: "Pay holiday bill",
            yaml: {
                context: "Deep",
                status: "Waiting",
                starred: "✰"
            }
        },
        "root/Groceries/Bread.md": {
            basename: "Bread",
            yaml: {
                context: "None",
                status: "Inbox",
                starred: "✰"
            }
        },
        "root/Groceries/Peppers.md": {
            basename: "Peppers"
        }
    }
    
}
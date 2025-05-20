import { Switch } from "@headlessui/react"
import { StacklinkLink } from "@/types"
import { classNames } from "@/utils"

type StacklinkInputProps = {
    item: StacklinkLink
    handleUrlChange: (e : React.ChangeEvent<HTMLInputElement>) => void
    handleEnableLink: (socialNetwork : string) => void
}

export default function StacklinkInput({item, handleUrlChange, handleEnableLink} : StacklinkInputProps) {
    return (
        <div className="bg-white shadow-sm p-5 flex flex-wrap items-center gap-5">
            <div 
                className="w-12 h-12 bg-cover"
                style={{ backgroundImage: `url('/social/icon_${item.name}.svg')`}}
            >

            </div>
            <input
                type="text"
                className="border-1 border-slate-400 flex-auto h-10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-offset-2"
                value={item.url}
                onChange={handleUrlChange}
                name={item.name}
            />


            <Switch
                checked={item.enabled}
                onChange={() => handleEnableLink(item.name)}
                className={classNames(
                    item.enabled ? 'bg-brand-3' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-offset-2 hover:bg-brand-5'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        item.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
        </div>
    )
}
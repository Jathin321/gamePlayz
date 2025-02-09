import { Megaphone } from "lucide-react";

export default function Announcements()
{
    return (
        <div className="container mx-auto mt-4">
        <div className="h-[60vh] overflow-y-scroll mb-10 pb-6">
          <div className="rounded h-3/4 p-4 bg-gray-900">
            <div>
              <table className="w-full mt-2">
                <tbody>
                  {/* Announcement Item */}
                  {[
                    "Hello world",
                    "Hello world",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                    "Hello world kjdhas kjasdhfkasdf jkahsdfkjsdahf kjjhsdfkjasdhf askdjfhkasjdf l;lsadhjhfkjasdhf lkaksdf hkjsdfh kjshdfjkhdfiuew bafiuweyrui bcja chjad fiyiwewribdf asiyisdgfiawueg iadsbf idfghwea",
                  ].map((announcement, index) => (
                    <tr key={index} className="text-lg text-left">
                      <td className="py-3 lg:px-4 bg-gray-900">
                        <div className="flex space-x-3">
                          <Megaphone color="#9875ff"/>
                          <span className="text-white text-lg w-4/5">
                            {announcement}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}